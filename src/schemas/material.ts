import { z } from 'zod';

export const createMaterialSchema = z.object({
  projectId: z.string().min(1),
  description: z.string().min(1).max(500),
  cableType: z.string().max(100).nullish(),
  cableSize: z.string().max(50).nullish(),
  totalLength: z.number().positive().nullish(),
  unit: z.enum(['metres', 'each', 'box', 'set', 'roll']),
  quantity: z.number().int().positive().default(1),
  listPrice: z.number().nonnegative().nullish(),
  nettPrice: z.number().nonnegative().nullish(),
});

export const updateMaterialSchema = z.object({
  description: z.string().min(1).max(500).optional(),
  totalLength: z.number().positive().nullish(),
  quantity: z.number().int().positive().optional(),
  listPrice: z.number().nonnegative().nullish(),
  nettPrice: z.number().nonnegative().nullish(),
});

export type CreateMaterialInput = z.infer<typeof createMaterialSchema>;
export type UpdateMaterialInput = z.infer<typeof updateMaterialSchema>;
