import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { rateLimit } from '../middleware/rateLimit';
import { createMaterialSchema, updateMaterialSchema } from '../../schemas/material';

const router = Router();

router.use(requireAuth);
router.use(rateLimit('auth'));

// POST /api/materials - Add manual material item
router.post('/', validate(createMaterialSchema), async (req: Request, res: Response) => {
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

    const material = await prisma.materialItem.create({
      data: {
        ...req.body,
        manuallyAdded: true,
      },
    });

    res.status(201).json({ success: true, data: material });
  } catch (error) {
    console.error('Error creating material:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to create material' },
    });
  }
});

// GET /api/materials/project/:projectId - Get all materials for a project
router.get('/project/:projectId', async (req: Request, res: Response) => {
  try {
    // Verify project ownership
    const project = await prisma.project.findFirst({
      where: { id: req.params.projectId, clerkUserId: req.userId },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Project not found' },
      });
    }

    const materials = await prisma.materialItem.findMany({
      where: { projectId: req.params.projectId },
      orderBy: [
        { manuallyAdded: 'asc' },
        { createdAt: 'asc' },
      ],
    });

    res.json({ success: true, data: materials });
  } catch (error) {
    console.error('Error fetching materials:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch materials' },
    });
  }
});

// PATCH /api/materials/:id - Update material
router.patch('/:id', validate(updateMaterialSchema), async (req: Request, res: Response) => {
  try {
    const material = await prisma.materialItem.findFirst({
      where: { id: req.params.id },
      include: { project: true },
    });

    if (!material || material.project.clerkUserId !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Material not found' },
      });
    }

    const updated = await prisma.materialItem.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating material:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to update material' },
    });
  }
});

// DELETE /api/materials/:id - Delete material (only manually added)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const material = await prisma.materialItem.findFirst({
      where: { id: req.params.id },
      include: { project: true },
    });

    if (!material || material.project.clerkUserId !== req.userId) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Material not found' },
      });
    }

    if (!material.manuallyAdded) {
      return res.status(400).json({
        success: false,
        error: { 
          code: 'CANNOT_DELETE', 
          message: 'Cannot delete auto-extracted materials. Delete the calculation instead.' 
        },
      });
    }

    await prisma.materialItem.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, data: { deleted: true } });
  } catch (error) {
    console.error('Error deleting material:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to delete material' },
    });
  }
});

export default router;
