import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { rateLimit } from '../middleware/rateLimit';

const router = Router();

router.use(requireAuth);
router.use(rateLimit('auth'));

// GET /api/contractor-profile - Get current user's profile
router.get('/', async (req: Request, res: Response) => {
  try {
    let profile = await prisma.contractorProfile.findUnique({
      where: { clerkUserId: req.userId },
    });

    // Create empty profile if doesn't exist
    if (!profile) {
      profile = await prisma.contractorProfile.create({
        data: { clerkUserId: req.userId! },
      });
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error fetching contractor profile:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to fetch profile' },
    });
  }
});

// PUT /api/contractor-profile - Update current user's profile
router.put('/', async (req: Request, res: Response) => {
  try {
    const {
      companyName,
      companyAddress,
      companyPhone,
      companyEmail,
      certificationNumber,
      certificationBody,
      vatNumber,
    } = req.body;

    const profile = await prisma.contractorProfile.upsert({
      where: { clerkUserId: req.userId },
      update: {
        companyName,
        companyAddress,
        companyPhone,
        companyEmail,
        certificationNumber,
        certificationBody,
        vatNumber,
      },
      create: {
        clerkUserId: req.userId!,
        companyName,
        companyAddress,
        companyPhone,
        companyEmail,
        certificationNumber,
        certificationBody,
        vatNumber,
      },
    });

    res.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error updating contractor profile:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Failed to update profile' },
    });
  }
});

export default router;
