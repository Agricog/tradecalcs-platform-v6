import { z } from 'zod';

export const createWholesalerQuoteSchema = z.object({
  projectId: z.string().min(1),
  wholesalerName: z.string().min(1).max(200),
  wholesalerEmail: z.string().email().nullish().or(z.literal('')),
  accountNumber: z.string().max(100).nullish(),
});

export const updateWholesalerQuoteSchema = z.object({
  discountPercent: z.number().min(0).max(100).nullish(),
  notes: z.string().max(1000).nullish(),
});

export const createCustomerQuoteSchema = z.object({
  projectId: z.string().min(1),
  notes: z.string().max(2000).nullish(),
  terms: z.string().max(2000).nullish(),
  validDays: z.number().int().min(1).max(365).default(30),
});

export const updateCustomerQuoteSchema = z.object({
  notes: z.string().max(2000).nullish(),
  terms: z.string().max(2000).nullish(),
  validDays: z.number().int().min(1).max(365).nullish(),
  markupPercent: z.number().min(0).max(500).nullish(),
  contingencyPercent: z.number().min(0).max(100).nullish(),
  vatPercent: z.number().min(0).max(100).nullish(),
});

export const createLabourItemSchema = z.object({
  description: z.string().min(1).max(500),
  days: z.number().positive().nullish(),
  dayRate: z.number().nonnegative().nullish(),
  total: z.number().nonnegative(),
});

export const updateLabourItemSchema = z.object({
  description: z.string().min(1).max(500).optional(),
  days: z.number().positive().nullish(),
  dayRate: z.number().nonnegative().nullish(),
  total: z.number().nonnegative().optional(),
});

export type CreateWholesalerQuoteInput = z.infer<typeof createWholesalerQuoteSchema>;
export type UpdateWholesalerQuoteInput = z.infer<typeof updateWholesalerQuoteSchema>;
export type CreateCustomerQuoteInput = z.infer<typeof createCustomerQuoteSchema>;
export type UpdateCustomerQuoteInput = z.infer<typeof updateCustomerQuoteSchema>;
export type CreateLabourItemInput = z.infer<typeof createLabourItemSchema>;
export type UpdateLabourItemInput = z.infer<typeof updateLabourItemSchema>;
