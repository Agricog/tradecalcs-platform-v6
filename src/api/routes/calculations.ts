import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { rateLimit } from '../middleware/rateLimit';
import { createCalculationSchema, updateCalculationSchema } from '../../schemas/calculation';

const router = Router();

router.use(requireAuth);
router.use(rateLimit('auth'));

// POST /api/calculations - Create calculation and extract materials
router.post('/', validate(createCalculationSchema), async (req: Request, res: Response) => {
  try {
    // Verify project ownership
    const project = await prisma.project.findFirst({
      where: { id: req.body.projectId, clerkUserId: req.userId },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Project not found' },
      });
    }

    // Create the calculation
    const calculation = await prisma.calculation.create({
      data: req.body,
    });

    // Auto-extract materials if cable data present (skip for brick calcs - they handle their own materials)
if (req.body.cableType && req.body.cableSize && req.body.lengthMetres && req.body.calcType !== 'brick_calc') {
      // Check if material with same type/size exists for this project
      const existingMaterial = await prisma.materialItem.findFirst({
        where: {
          projectId: req.body.projectId,
          cableType: req.body.cableType,
          cableSize: req.body.cableSize,
          manuallyAdded: false,
        },
      });

      if (existingMaterial) {
        // Update existing material - add length and link calculation
        const sourceCalcIds = (existingMaterial.sourceCalcIds as string[]) || [];
        await prisma.materialItem.update({
          where: { id: existingMaterial.id },
          data: {
            totalLength: {
              increment: req.body.lengthMetres,
            },
            sourceCalcIds: [...sourceCalcIds, calculation.id],
          },
        });
      } else {
        // Create new material item
        await prisma.materialItem.create({
          data: {
            projectId: req.body.projectId,
            description: `${req.body.cableSize} ${req.body.cableType}`,
            cableType: req.body.cableType,
            cableSize: req.body.cableSize,
            totalLength: req.body.lengthMetres,
            unit: 'metres',
            quantity: req.body.quantity || 1,
            sourceCalcIds: [calculation.id],
            manuallyAdded: false,
          },
        });
      }
    }

    res.status(201).json({ success: true, data: calculation });
  } catch (error) {
    console.error('Error creating calculation:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to create calculation' },
    });
  }
});

// GET /api/calculations/:id - Get single calculation
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const calculation = await prisma.calculation.findFirst({
      where: { id: req.params.id },
      include: { project: true },
    });

    if (!calculation || calculation.project.clerkUserId !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Calculation not found' },
      });
    }

    res.json({ success: true, data: calculation });
  } catch (error) {
    console.error('Error fetching calculation:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch calculation' },
    });
  }
});

// PATCH /api/calculations/:id - Update calculation
router.patch('/:id', validate(updateCalculationSchema), async (req: Request, res: Response) => {
  try {
    const calculation = await prisma.calculation.findFirst({
      where: { id: req.params.id },
      include: { project: true },
    });

    if (!calculation || calculation.project.clerkUserId !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Calculation not found' },
      });
    }

    const updated = await prisma.calculation.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating calculation:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to update calculation' },
    });
  }
});

// DELETE /api/calculations/:id - Delete calculation
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const calculation = await prisma.calculation.findFirst({
      where: { id: req.params.id },
      include: { project: true },
    });

    if (!calculation || calculation.project.clerkUserId !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Calculation not found' },
      });
    }

    // Remove this calculation ID from any linked material items
    const linkedMaterials = await prisma.materialItem.findMany({
      where: {
        projectId: calculation.projectId,
        manuallyAdded: false,
      },
    });

    for (const material of linkedMaterials) {
      const sourceCalcIds = (material.sourceCalcIds as string[]) || [];
      if (sourceCalcIds.includes(calculation.id)) {
        const newSourceIds = sourceCalcIds.filter(id => id !== calculation.id);
        
        if (newSourceIds.length === 0) {
          // No more linked calculations, delete the material
          await prisma.materialItem.delete({ where: { id: material.id } });
        } else {
          // Update source IDs and recalculate total length
          // Note: This is simplified - in production you'd recalculate from linked calcs
          await prisma.materialItem.update({
            where: { id: material.id },
            data: { sourceCalcIds: newSourceIds },
          });
        }
      }
    }

    await prisma.calculation.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, data: { deleted: true } });
  } catch (error) {
    console.error('Error deleting calculation:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to delete calculation' },
    });
  }
});

export default router;
