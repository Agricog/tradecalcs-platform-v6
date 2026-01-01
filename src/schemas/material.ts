import { z } from 'zod';

export const createMaterialSchema = z.object({
  projectId: z.string().min(1),
  description: z.string().min(1).max(500),
  cableType: z.string().max(100).optional().nullable(),
  cableSize: z.string().max(50).optional().nullable(),
  totalLength: z.number().positive().optional().nullable(),
  unit: z.enum(['metres', 'each', 'box', 'set', 'roll']),
  quantity: z.number().int().positive().default(1),
  listPrice: z.number().nonnegative().optional().nullable(),
  nettPrice: z.number().nonnegative().optional().nullable(),
});

export const updateMaterialSchema = z.object({
  description: z.string().min(1).max(500).optional(),
  totalLength: z.number().positive().optional().nullable(),
  quantity: z.number().int().positive().optional(),
  listPrice: z.number().nonnegative().optional().nullable(),
  nettPrice: z.number().nonnegative().optional().nullable(),
});

export type CreateMaterialInput = z.infer<typeof createMaterialSchema>;
export type UpdateMaterialInput = z.infer<typeof updateMaterialSchema>;
