import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { rateLimit } from '../middleware/rateLimit';
import { generateInvoicePDF } from '../../lib/generateInvoicePDF';

const router = Router();

router.use(requireAuth);
router.use(rateLimit('auth'));

// Generate next invoice number
async function getNextInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `INV-${year}-`;
  
  const lastInvoice = await prisma.invoice.findFirst({
    where: { invoiceNumber: { startsWith: prefix } },
    orderBy: { invoiceNumber: 'desc' },
  });

  if (!lastInvoice) {
    return `${prefix}0001`;
  }

  const lastNumber = parseInt(lastInvoice.invoiceNumber.replace(prefix, ''), 10);
  const nextNumber = (lastNumber + 1).toString().padStart(4, '0');
  return `${prefix}${nextNumber}`;
}

// GET /api/invoices - List all invoices for user
router.get('/', async (req: Request, res: Response) => {
  try {
    const invoices = await prisma.invoice.findMany({
      where: {
        project: { clerkUserId: req.userId },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        project: { select: { name: true } },
      },
    });

    res.json({ success: true, data: invoices });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch invoices' },
    });
  }
});

// GET /api/invoices/:id - Get single invoice
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const invoice = await prisma.invoice.findFirst({
      where: {
        id: req.params.id,
        project: { clerkUserId: req.userId },
      },
      include: {
        project: { select: { name: true, address: true } },
        invoiceItems: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Invoice not found' },
      });
    }

    res.json({ success: true, data: invoice });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch invoice' },
    });
  }
});

// POST /api/invoices/from-quote/:quoteId - Convert quote to invoice
router.post('/from-quote/:quoteId', async (req: Request, res: Response) => {
  try {
    // Fetch the quote with project and items
    const quote = await prisma.customerQuote.findFirst({
      where: {
        id: req.params.quoteId,
        project: { clerkUserId: req.userId },
      },
      include: {
        project: true,
        labourItems: true,
      },
    });

    if (!quote) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Quote not found' },
      });
    }

    // Get next invoice number
    const invoiceNumber = await getNextInvoiceNumber();

    // Calculate due date based on payment terms
    const paymentTerms = req.body.paymentTerms || 30;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + paymentTerms);

    // Fetch material items for the project
    const materialItems = await prisma.materialItem.findMany({
      where: { projectId: quote.projectId },
    });

    // Create invoice
    const invoice = await prisma.invoice.create({
      data: {
        projectId: quote.projectId,
        customerQuoteId: quote.id,
        invoiceNumber,
        status: 'draft',
        customerName: quote.customerName,
        customerEmail: quote.customerEmail,
        customerPhone: quote.customerPhone,
        customerAddress: quote.project.address,
        materialsTotal: quote.materialsTotal,
        labourTotal: quote.labourTotal,
        subtotal: quote.subtotal,
        markupAmount: quote.markupAmount || 0,
        contingencyAmount: quote.contingencyAmount || 0,
        netTotal: quote.netTotal,
        vatPercent: quote.vatPercent,
        vatAmount: quote.vatAmount,
        grandTotal: quote.grandTotal,
        paymentTerms,
        dueDate,
        notes: req.body.notes || null,
        invoiceItems: {
          create: [
            // Material items
            ...materialItems.map((item) => ({
              description: item.description,
              quantity: item.totalLength || item.quantity || 1,
              unitPrice: item.nettPrice || item.listPrice || 0,
              total: (Number(item.nettPrice || item.listPrice || 0)) * Number(item.totalLength || item.quantity || 1),
            })),
            // Labour items
...quote.labourItems.map((item) => ({
  description: item.description,
  quantity: item.hours || 1,
  unitPrice: item.rate || item.total || 0,
  total: item.total,
})),
          ],
        },
      },
      include: {
        invoiceItems: true,
        project: { select: { name: true } },
      },
    });

    res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    console.error('Error creating invoice from quote:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to create invoice' },
    });
  }
});

// PATCH /api/invoices/:id - Update invoice
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    // Verify ownership
    const existing = await prisma.invoice.findFirst({
      where: {
        id: req.params.id,
        project: { clerkUserId: req.userId },
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Invoice not found' },
      });
    }

    const { status, notes, dueDate, paymentTerms, paidAt, paidAmount } = req.body;

    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);
    if (paymentTerms !== undefined) updateData.paymentTerms = paymentTerms;
    if (paidAt !== undefined) updateData.paidAt = paidAt ? new Date(paidAt) : null;
    if (paidAmount !== undefined) updateData.paidAmount = paidAmount;

    // If marking as sent, set sentAt
    if (status === 'sent' && !existing.sentAt) {
      updateData.sentAt = new Date();
    }

    const invoice = await prisma.invoice.update({
      where: { id: req.params.id },
      data: updateData,
      include: {
        invoiceItems: true,
        project: { select: { name: true } },
      },
    });

    res.json({ success: true, data: invoice });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to update invoice' },
    });
  }
});

// POST /api/invoices/:id/mark-paid - Quick action to mark as paid
router.post('/:id/mark-paid', async (req: Request, res: Response) => {
  try {
    const existing = await prisma.invoice.findFirst({
      where: {
        id: req.params.id,
        project: { clerkUserId: req.userId },
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Invoice not found' },
      });
    }

    const invoice = await prisma.invoice.update({
      where: { id: req.params.id },
      data: {
        status: 'paid',
        paidAt: new Date(),
        paidAmount: existing.grandTotal,
      },
      include: {
        invoiceItems: true,
        project: { select: { name: true } },
      },
    });

    res.json({ success: true, data: invoice });
  } catch (error) {
    console.error('Error marking invoice as paid:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to mark invoice as paid' },
    });
  }
});

// DELETE /api/invoices/:id - Delete invoice
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const existing = await prisma.invoice.findFirst({
      where: {
        id: req.params.id,
        project: { clerkUserId: req.userId },
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Invoice not found' },
      });
    }

    // Don't allow deleting paid invoices
    if (existing.status === 'paid') {
      return res.status(400).json({
        success: false,
        error: { code: 'CANNOT_DELETE', message: 'Cannot delete a paid invoice' },
      });
    }

    await prisma.invoice.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, data: { deleted: true } });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to delete invoice' },
    });
  }
});

// GET /api/invoices/:id/pdf - Generate invoice PDF
router.get('/:id/pdf', async (req: Request, res: Response) => {
  try {
    const invoice = await prisma.invoice.findFirst({
      where: {
        id: req.params.id,
        project: { clerkUserId: req.userId },
      },
      include: {
        project: { select: { name: true, address: true } },
        invoiceItems: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Invoice not found' },
      });
    }

    // Fetch contractor profile
    const contractorProfile = await prisma.contractorProfile.findUnique({
      where: { clerkUserId: req.userId },
    });

    const pdf = generateInvoicePDF({
      invoiceNumber: invoice.invoiceNumber,
      status: invoice.status,
      createdAt: invoice.createdAt.toISOString(),
      dueDate: invoice.dueDate?.toISOString(),
      paymentTerms: invoice.paymentTerms,
      customerName: invoice.customerName || undefined,
      customerEmail: invoice.customerEmail || undefined,
      customerPhone: invoice.customerPhone || undefined,
      customerAddress: invoice.customerAddress || undefined,
      projectName: invoice.project.name,
      projectAddress: invoice.project.address || undefined,
      contractor: contractorProfile ? {
        companyName: contractorProfile.companyName || undefined,
        companyAddress: contractorProfile.companyAddress || undefined,
        companyPhone: contractorProfile.companyPhone || undefined,
        companyEmail: contractorProfile.companyEmail || undefined,
        vatNumber: contractorProfile.vatNumber || undefined,
      } : undefined,
      materialsTotal: Number(invoice.materialsTotal),
      labourTotal: Number(invoice.labourTotal),
      subtotal: Number(invoice.subtotal),
      markupAmount: Number(invoice.markupAmount),
      contingencyAmount: Number(invoice.contingencyAmount),
      netTotal: Number(invoice.netTotal),
      vatPercent: Number(invoice.vatPercent),
      vatAmount: Number(invoice.vatAmount),
      grandTotal: Number(invoice.grandTotal),
      items: invoice.invoiceItems.map(item => ({
        description: item.description,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
        total: Number(item.total),
      })),
      notes: invoice.notes || undefined,
    });

    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${invoice.invoiceNumber}.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating invoice PDF:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to generate PDF' },
    });
  }
});

export default router;
