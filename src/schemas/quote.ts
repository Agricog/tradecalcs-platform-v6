import { z } from 'zod';

// Wholesaler quote schemas
export const createWholesalerQuoteSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
  wholesalerName: z.string().min(1, 'Wholesaler name is required').max(200),
  wholesalerEmail: z.string().email('Valid email required'),
  accountNumber: z.string().max(100).optional(),
});

export const updateWholesalerQuoteSchema = z.object({
  discountPercent: z.number().min(0).max(100).optional(),
  notes: z.string().max(1000).optional(),
  status: z.enum(['draft', 'sent', 'priced', 'expired']).optional(),
});

// Customer quote schemas
export const createCustomerQuoteSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
  notes: z.string().max(2000).optional(),
  terms: z.string().max(2000).optional(),
  validDays: z.number().int().positive().default(30),
});

export const updateCustomerQuoteSchema = z.object({
  markupPercent: z.number().min(0).max(500).optional(),
  contingencyPercent: z.number().min(0).max(100).optional(),
  vatPercent: z.number().min(0).max(100).optional(),
  validDays: z.number().int().positive().optional(),
  notes: z.string().max(2000).optional(),
  terms: z.string().max(2000).optional(),
  status: z.enum(['draft', 'sent', 'accepted', 'rejected', 'expired']).optional(),
});

// Labour item schemas
export const createLabourItemSchema = z.object({
  customerQuoteId: z.string().min(1, 'Quote ID is required'),
  description: z.string().min(1, 'Description is required').max(500),
  days: z.number().positive().optional(),
  dayRate: z.number().positive().optional(),
  total: z.number().positive(),
});

export const updateLabourItemSchema = z.object({
  description: z.string().min(1).max(500).optional(),
  days: z.number().positive().optional(),
  dayRate: z.number().positive().optional(),
  total: z.number().positive().optional(),
});

export type CreateWholesalerQuoteInput = z.infer<typeof createWholesalerQuoteSchema>;
export type UpdateWholesalerQuoteInput = z.infer<typeof updateWholesalerQuoteSchema>;
export type CreateCustomerQuoteInput = z.infer<typeof createCustomerQuoteSchema>;
export type UpdateCustomerQuoteInput = z.infer<typeof updateCustomerQuoteSchema>;
export type CreateLabourItemInput = z.infer<typeof createLabourItemSchema>;
export type UpdateLabourItemInput = z.infer<typeof updateLabourItemSchema>;
