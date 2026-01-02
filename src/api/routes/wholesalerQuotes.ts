import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import prisma from '../../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { rateLimit } from '../middleware/rateLimit';
import { createWholesalerQuoteSchema, updateWholesalerQuoteSchema } from '../../schemas/quote';
import { sendWholesalerQuoteEmail, sendQuotePricedNotification } from '../services/email';

const router = Router();

// POST /api/wholesaler-quotes - Create and send quote request (authenticated)
router.post('/', requireAuth, rateLimit('auth'), validate(createWholesalerQuoteSchema), async (req: Request, res: Response) => {
  try {
    // Verify project ownership
    const project = await prisma.project.findFirst({
      where: { id: req.body.projectId, clerkUserId: req.userId },
      include: { materialItems: true },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Project not found' },
      });
    }

    if (project.materialItems.length === 0) {
      return res.status(400).json({
        success: false,
        error: { code: 'NO_MATERIALS', message: 'Add materials before requesting a quote' },
      });
    }

    // Generate unique token for public quote page
    const token = crypto.randomBytes(32).toString('hex');

    const wholesalerQuote = await prisma.wholesalerQuote.create({
      data: {
        projectId: req.body.projectId,
        token,
        wholesalerName: req.body.wholesalerName,
        wholesalerEmail: req.body.wholesalerEmail || null,
        accountNumber: req.body.accountNumber || null,
        status: 'sent',
        sentAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    const quoteUrl = `${process.env.APP_URL}/quote/${token}`;

    // Send email if wholesaler email provided
    if (req.body.wholesalerEmail) {
      await sendWholesalerQuoteEmail({
        to: req.body.wholesalerEmail,
        wholesalerName: req.body.wholesalerName,
        projectName: project.name,
        accountNumber: req.body.accountNumber || undefined,
        quoteUrl,
        materialCount: project.materialItems.length,
      });
    }

    res.status(201).json({ 
      success: true, 
      data: {
        ...wholesalerQuote,
        quoteUrl,
      },
    });
  } catch (error) {
    console.error('Error creating wholesaler quote:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to create quote request' },
    });
  }
});

// GET /api/wholesaler-quotes/public/:token - Public page for wholesaler (no auth)
router.get('/public/:token', rateLimit('public'), async (req: Request, res: Response) => {
  try {
    const quote = await prisma.wholesalerQuote.findFirst({
      where: { token: req.params.token },
      include: {
        project: {
          include: {
            materialItems: true,
          },
        },
      },
    });

    if (!quote) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Quote not found' },
      });
    }

    if (quote.expiresAt && new Date() > quote.expiresAt) {
      return res.status(410).json({
        success: false,
        error: { code: 'EXPIRED', message: 'This quote request has expired' },
      });
    }

    // Return limited data - don't expose customer email/phone to wholesaler
    res.json({
      success: true,
      data: {
        id: quote.id,
        projectName: quote.project.name,
        projectAddress: quote.project.address,
        accountNumber: quote.accountNumber,
        materials: quote.project.materialItems.map(m => ({
          id: m.id,
          description: m.description,
          totalLength: m.totalLength,
          unit: m.unit,
          quantity: m.quantity,
        })),
        status: quote.status,
        discountPercent: quote.discountPercent,
        notes: quote.notes,
      },
    });
  } catch (error) {
    console.error('Error fetching public quote:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch quote' },
    });
  }
});

// PATCH /api/wholesaler-quotes/public/:token - Wholesaler submits pricing (no auth)
router.patch('/public/:token', rateLimit('public'), validate(updateWholesalerQuoteSchema), async (req: Request, res: Response) => {
  try {
    const quote = await prisma.wholesalerQuote.findFirst({
      where: { token: req.params.token },
      include: {
        project: true,
      },
    });

    if (!quote) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Quote not found' },
      });
    }

    if (quote.expiresAt && new Date() > quote.expiresAt) {
      return res.status(410).json({
        success: false,
        error: { code: 'EXPIRED', message: 'This quote request has expired' },
      });
    }

    // Update quote with discount and notes
    const updated = await prisma.wholesalerQuote.update({
      where: { id: quote.id },
      data: {
        discountPercent: req.body.discountPercent,
        notes: req.body.notes,
        status: 'priced',
        pricedAt: new Date(),
      },
    });

    // Get the electrician's email to notify them
    // For now we'll use the project's customer email or skip if not available
    // In future, we'd store the electrician's email from Clerk
    if (quote.project.customerEmail) {
      const projectUrl = `${process.env.APP_URL}/projects/${quote.projectId}`;
      
      await sendQuotePricedNotification({
        to: quote.project.customerEmail,
        electricianName: quote.project.customerName || '',
        wholesalerName: quote.wholesalerName,
        projectName: quote.project.name,
        discountPercent: req.body.discountPercent,
        projectUrl,
      });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating wholesaler quote:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to update quote' },
    });
  }
});

// GET /api/wholesaler-quotes/project/:projectId - Get all quotes for project (authenticated)
router.get('/project/:projectId', requireAuth, rateLimit('auth'), async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findFirst({
      where: { id: req.params.projectId, clerkUserId: req.userId },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Project not found' },
      });
    }

    const quotes = await prisma.wholesalerQuote.findMany({
      where: { projectId: req.params.projectId },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: quotes });
  } catch (error) {
    console.error('Error fetching wholesaler quotes:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch quotes' },
    });
  }
});

export default router;
