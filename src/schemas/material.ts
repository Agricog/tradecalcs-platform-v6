import { z } from 'zod';

export const createMaterialSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
  description: z.string().min(1, 'Description is required').max(500),
  cableType: z.string().max(100).optional(),
  cableSize: z.string().max(50).optional(),
  totalLength: z.number().positive().optional(),
  unit: z.enum(['metres', 'each', 'box', 'set', 'roll']).default('metres'),
  quantity: z.number().int().positive().default(1),
  listPrice: z.number().positive().optional(),
  manuallyAdded: z.boolean().default(true),
});

export const updateMaterialSchema = z.object({
  description: z.string().min(1).max(500).optional(),
  cableType: z.string().max(100).optional(),
  cableSize: z.string().max(50).optional(),
  totalLength: z.number().positive().optional(),
  unit: z.enum(['metres', 'each', 'box', 'set', 'roll']).optional(),
  quantity: z.number().int().positive().optional(),
  listPrice: z.number().positive().optional(),
  nettPrice: z.number().positive().optional(),
});

export type CreateMaterialInput = z.infer<typeof createMaterialSchema>;
export type UpdateMaterialInput = z.infer<typeof updateMaterialSchema>;
