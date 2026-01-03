import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { rateLimit } from '../middleware/rateLimit';
import { createProjectSchema, updateProjectSchema } from '../../schemas/project';
import { uploadToR2, getSignedDownloadUrl } from '../../lib/r2';
import { generateEvidencePackPDF } from '../../lib/generateEvidencePackPDF';

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

// POST /api/projects/:id/mark-installed - Mark project as installed
router.post('/:id/mark-installed', async (req: Request, res: Response) => {
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

    // Validate installation date if provided, otherwise use now
    let installationDate: Date;
    if (req.body.installationDate) {
      installationDate = new Date(req.body.installationDate);
      if (isNaN(installationDate.getTime())) {
        return res.status(400).json({
          success: false,
          error: { code: 'INVALID_DATE', message: 'Invalid installation date' },
        });
      }
    } else {
      installationDate = new Date();
    }

    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: {
        installationDate,
        status: 'installed',
      },
    });

    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Error marking project as installed:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to mark project as installed' },
    });
  }
});

// POST /api/projects/:id/generate-evidence-pack - Generate and store evidence pack PDF
router.post('/:id/generate-evidence-pack', async (req: Request, res: Response) => {
  try {
    // Fetch project with all calculations
    const project = await prisma.project.findFirst({
      where: { id: req.params.id, clerkUserId: req.userId },
      include: {
        calculations: { orderBy: { createdAt: 'asc' } },
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Project not found' },
      });
    }

    if (!project.installationDate) {
      return res.status(400).json({
        success: false,
        error: { code: 'NOT_INSTALLED', message: 'Project must be marked as installed first' },
      });
    }

    if (project.calculations.length === 0) {
      return res.status(400).json({
        success: false,
        error: { code: 'NO_CALCULATIONS', message: 'Project has no calculations to include' },
      });
    }

    // Generate PDF
    const pdf = generateEvidencePackPDF({
      project: {
        name: project.name,
        address: project.address || undefined,
        customerName: project.customerName || undefined,
        installationDate: project.installationDate.toISOString(),
      },
      calculations: project.calculations.map(calc => ({
        circuitName: calc.circuitName,
        calcType: calc.calcType,
        inputs: calc.inputs as Record<string, unknown>,
        outputs: calc.outputs as Record<string, unknown>,
        cableType: calc.cableType || undefined,
        cableSize: calc.cableSize || undefined,
        lengthMetres: calc.lengthMetres ? Number(calc.lengthMetres) : undefined,
        createdAt: calc.createdAt.toISOString(),
      })),
      generatedAt: new Date().toISOString(),
    });

    // Convert to buffer
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

    // Upload to R2
    const fileName = `evidence-packs/${project.id}/${Date.now()}-evidence-pack.pdf`;
    await uploadToR2(fileName, pdfBuffer, 'application/pdf');

    // Update project with evidence pack URL
    const updatedProject = await prisma.project.update({
      where: { id: project.id },
      data: { evidencePackUrl: fileName },
    });

    res.json({ success: true, data: updatedProject });
  } catch (error) {
    console.error('Error generating evidence pack:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to generate evidence pack' },
    });
  }
});

// GET /api/projects/:id/evidence-pack-url - Get signed download URL
router.get('/:id/evidence-pack-url', async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findFirst({
      where: { id: req.params.id, clerkUserId: req.userId },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Project not found' },
      });
    }

    if (!project.evidencePackUrl) {
      return res.status(404).json({
        success: false,
        error: { code: 'NO_EVIDENCE_PACK', message: 'No evidence pack generated yet' },
      });
    }

    const signedUrl = await getSignedDownloadUrl(project.evidencePackUrl);

    res.json({ success: true, data: { url: signedUrl } });
  } catch (error) {
    console.error('Error getting evidence pack URL:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to get download URL' },
    });
  }
});

export default router;
