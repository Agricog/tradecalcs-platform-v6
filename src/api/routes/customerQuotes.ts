import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { rateLimit } from '../middleware/rateLimit';
import { 
  createCustomerQuoteSchema, 
  updateCustomerQuoteSchema,
  createLabourItemSchema,
  updateLabourItemSchema,
} from '../../schemas/quote';

const router = Router();

router.use(requireAuth);
router.use(rateLimit('auth'));

// Helper to generate quote number
async function generateQuoteNumber(userId: string): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.customerQuote.count({
    where: {
      project: { clerkUserId: userId },
      createdAt: {
        gte: new Date(`${year}-01-01`),
        lt: new Date(`${year + 1}-01-01`),
      },
    },
  });
  return `TC-${year}-${String(count + 1).padStart(4, '0')}`;
}

// Helper to recalculate quote totals
async function recalculateQuoteTotals(quoteId: string) {
  const quote = await prisma.customerQuote.findUnique({
    where: { id: quoteId },
    include: {
      labourItems: true,
      project: {
        include: { materialItems: true },
      },
    },
  });

  if (!quote) return;

  // Sum materials (use nettPrice if available, otherwise listPrice)
  const materialsTotal = quote.project.materialItems.reduce((sum, m) => {
    const price = Number(m.nettPrice) || Number(m.listPrice) || 0;
    return sum + price;
  }, 0);

  // Sum labour
  const labourTotal = quote.labourItems.reduce((sum, l) => sum + Number(l.total), 0);

  // Calculate totals
  const subtotal = materialsTotal + labourTotal;
  const markupAmount = subtotal * (Number(quote.markupPercent) / 100);
  const afterMarkup = subtotal + markupAmount;
  const contingencyAmount = afterMarkup * (Number(quote.contingencyPercent) / 100);
  const netTotal = afterMarkup + contingencyAmount;
  const vatAmount = netTotal * (Number(quote.vatPercent) / 100);
  const grandTotal = netTotal + vatAmount;

  await prisma.customerQuote.update({
    where: { id: quoteId },
    data: {
      materialsTotal,
      labourTotal,
      subtotal,
      markupAmount,
      contingencyAmount,
      netTotal,
      vatAmount,
      grandTotal,
    },
  });
}

// POST /api/customer-quotes - Create customer quote
router.post('/', validate(createCustomerQuoteSchema), async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findFirst({
      where: { id: req.body.projectId, clerkUserId: req.userId },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Project not found' },
      });
    }

    const quoteNumber = await generateQuoteNumber(req.userId!);

    const quote = await prisma.customerQuote.create({
      data: {
        projectId: req.body.projectId,
        quoteNumber,
        notes: req.body.notes,
        terms: req.body.terms,
        validDays: req.body.validDays || 30,
      },
    });

    await recalculateQuoteTotals(quote.id);

    const updated = await prisma.customerQuote.findUnique({
      where: { id: quote.id },
      include: { labourItems: true },
    });

    res.status(201).json({ success: true, data: updated });
  } catch (error) {
    console.error('Error creating customer quote:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to create quote' },
    });
  }
});

// GET /api/customer-quotes/:id - Get single quote
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const quote = await prisma.customerQuote.findFirst({
      where: { id: req.params.id },
      include: {
        labourItems: true,
        project: {
          include: { materialItems: true },
        },
      },
    });

    if (!quote || quote.project.clerkUserId !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Quote not found' },
      });
    }

    res.json({ success: true, data: quote });
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch quote' },
    });
  }
});

// PATCH /api/customer-quotes/:id - Update quote
router.patch('/:id', validate(updateCustomerQuoteSchema), async (req: Request, res: Response) => {
  try {
    const quote = await prisma.customerQuote.findFirst({
      where: { id: req.params.id },
      include: { project: true },
    });

    if (!quote || quote.project.clerkUserId !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Quote not found' },
      });
    }

    await prisma.customerQuote.update({
      where: { id: req.params.id },
      data: req.body,
    });

    await recalculateQuoteTotals(req.params.id);

    const updated = await prisma.customerQuote.findUnique({
      where: { id: req.params.id },
      include: { labourItems: true },
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating quote:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to update quote' },
    });
  }
});

// DELETE /api/customer-quotes/:id - Delete quote
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const quote = await prisma.customerQuote.findFirst({
      where: { id: req.params.id },
      include: { project: true },
    });

    if (!quote || quote.project.clerkUserId !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Quote not found' },
      });
    }

    await prisma.customerQuote.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, data: { deleted: true } });
  } catch (error) {
    console.error('Error deleting quote:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to delete quote' },
    });
  }
});

// POST /api/customer-quotes/:id/labour - Add labour item
router.post('/:id/labour', validate(createLabourItemSchema), async (req: Request, res: Response) => {
  try {
    const quote = await prisma.customerQuote.findFirst({
      where: { id: req.params.id },
      include: { project: true },
    });

    if (!quote || quote.project.clerkUserId !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Quote not found' },
      });
    }

    const labourItem = await prisma.labourItem.create({
      data: {
        customerQuoteId: req.params.id,
        description: req.body.description,
        days: req.body.days,
        dayRate: req.body.dayRate,
        total: req.body.total,
      },
    });

    await recalculateQuoteTotals(req.params.id);

    res.status(201).json({ success: true, data: labourItem });
  } catch (error) {
    console.error('Error creating labour item:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to add labour item' },
    });
  }
});

// PATCH /api/customer-quotes/labour/:labourId - Update labour item
router.patch('/labour/:labourId', validate(updateLabourItemSchema), async (req: Request, res: Response) => {
  try {
    const labourItem = await prisma.labourItem.findFirst({
      where: { id: req.params.labourId },
      include: {
        customerQuote: {
          include: { project: true },
        },
      },
    });

    if (!labourItem || labourItem.customerQuote.project.clerkUserId !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Labour item not found' },
      });
    }

    const updated = await prisma.labourItem.update({
      where: { id: req.params.labourId },
      data: req.body,
    });

    await recalculateQuoteTotals(labourItem.customerQuoteId);

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating labour item:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to update labour item' },
    });
  }
});

// DELETE /api/customer-quotes/labour/:labourId - Delete labour item
router.delete('/labour/:labourId', async (req: Request, res: Response) => {
  try {
    const labourItem = await prisma.labourItem.findFirst({
      where: { id: req.params.labourId },
      include: {
        customerQuote: {
          include: { project: true },
        },
      },
    });

    if (!labourItem || labourItem.customerQuote.project.clerkUserId !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Labour item not found' },
      });
    }

    const quoteId = labourItem.customerQuoteId;

    await prisma.labourItem.delete({
      where: { id: req.params.labourId },
    });

    await recalculateQuoteTotals(quoteId);

    res.json({ success: true, data: { deleted: true } });
  } catch (error) {
    console.error('Error deleting labour item:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to delete labour item' },
    });
  }
});

export default router;
