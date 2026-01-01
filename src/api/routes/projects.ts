import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { rateLimit } from '../middleware/rateLimit';
import { createProjectSchema, updateProjectSchema } from '../../schemas/project';

const router = Router();

// All routes require authentication
router.use(requireAuth);
router.use(rateLimit('auth'));

// GET /api/projects - List all projects for user
router.get('/', async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: { clerkUserId: req.userId },
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: {
          select: {
            calculations: true,
            materialItems: true,
          },
        },
      },
    });

    res.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch projects' },
    });
  }
});

// GET /api/projects/:id - Get single project with all related data
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findFirst({
      where: {
        id: req.params.id,
        clerkUserId: req.userId,
      },
      include: {
        calculations: { orderBy: { createdAt: 'asc' } },
        materialItems: { orderBy: { createdAt: 'asc' } },
        wholesalerQuotes: { orderBy: { createdAt: 'desc' } },
        customerQuotes: {
          orderBy: { createdAt: 'desc' },
          include: { labourItems: true },
        },
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Project not found' },
      });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch project' },
    });
  }
});

// POST /api/projects - Create new project
router.post('/', validate(createProjectSchema), async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.create({
      data: {
        ...req.body,
        clerkUserId: req.userId!,
      },
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to create project' },
    });
  }
});

// PATCH /api/projects/:id - Update project
router.patch('/:id', validate(updateProjectSchema), async (req: Request, res: Response) => {
  try {
    // Verify ownership
    const existing = await prisma.project.findFirst({
      where: { id: req.params.id, clerkUserId: req.userId },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Project not found' },
      });
    }

    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to update project' },
    });
  }
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    // Verify ownership
    const existing = await prisma.project.findFirst({
      where: { id: req.params.id, clerkUserId: req.userId },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Project not found' },
      });
    }

    await prisma.project.delete({
      where: { id: req.params.id },
    });

    res.json({ success: true, data: { deleted: true } });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to delete project' },
    });
  }
});

export default router;
