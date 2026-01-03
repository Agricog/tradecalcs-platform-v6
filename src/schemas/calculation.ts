import { z } from 'zod';

export const createCalculationSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
  circuitName: z.string().min(1, 'Circuit name is required').max(200),
  calcType: z.enum([
    'cable_sizing',
    'voltage_drop',
    'disconnection',
    'max_demand',
    'conduit_fill',
    'brick_calc',
    'drainage_bedding',
    'drainage_spoil',
    'concrete_to_bags'
  ]),
  inputs: z.record(z.any()).optional(),
  outputs: z.record(z.any()).optional(),
  inputParameters: z.record(z.any()).optional(),
  results: z.record(z.any()).optional(),
  cableType: z.string().max(100).optional(),
  cableSize: z.string().max(50).optional(),
  lengthMetres: z.number().positive().optional(),
  quantity: z.number().int().positive().default(1),
  materials: z.array(z.object({
    description: z.string(),
    quantity: z.number(),
    unit: z.string(),
  })).optional(),
});

export const updateCalculationSchema = z.object({
  circuitName: z.string().min(1).max(200).optional(),
  inputs: z.record(z.any()).optional(),
  outputs: z.record(z.any()).optional(),
  inputParameters: z.record(z.any()).optional(),
  results: z.record(z.any()).optional(),
  cableType: z.string().max(100).optional(),
  cableSize: z.string().max(50).optional(),
  lengthMetres: z.number().positive().optional(),
  quantity: z.number().int().positive().optional(),
});

export type CreateCalculationInput = z.infer<typeof createCalculationSchema>;
export type UpdateCalculationInput = z.infer<typeof updateCalculationSchema>;
