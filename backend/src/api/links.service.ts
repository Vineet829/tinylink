import prisma from '../prisma/client';
import { isValidUrl, isValidCode } from '../utils/validators';
import { Request, Response, NextFunction } from 'express';

export async function createLink({ code, targetUrl }: { code?: string; targetUrl: string }) {
  if (!isValidUrl(targetUrl)) {
    const err = new Error('Invalid URL') as Error & { status?: number };
    err.status = 400;
    throw err;
  }
  if (code && !isValidCode(code)) {
    const err = new Error('Custom code invalid. Use 6-8 [A-Za-z0-9]') as Error & { status?: number };
    err.status = 400;
    throw err;
  }
  const finalCode = code || Math.random().toString(36).slice(-8);
  const exists = await prisma.link.findUnique({ where: { code: finalCode } });
  if (exists) {
    const err = new Error('Code already exists') as Error & { status?: number };
    err.status = 409;
    throw err;
  }
  return prisma.link.create({
    data: { code: finalCode, targetUrl },
  });
}

export async function listLinks() {
  return prisma.link.findMany({
    orderBy: [{ createdAt: 'desc' }],
  });
}

export async function getLinkStats(code: string) {
  return prisma.link.findUnique({ where: { code } });
}

export async function deleteLink(code: string) {
  const existing = await prisma.link.findUnique({ where: { code } });
  if (!existing) {
    const err = new Error('Not found') as Error & { status?: number };
    err.status = 404;
    throw err;
  }
  return prisma.link.delete({ where: { code } });
}

export async function redirectForCode(req: Request, res: Response, next: NextFunction) {
  try {
    const code = req.params.code;
    const link = await prisma.link.findUnique({ where: { code } });
    if (!link) {
      return res.status(404).json({ error: 'Not found' });
    }
    await prisma.link.update({
      where: { code },
      data: {
        totalClicks: { increment: 1 },
        lastClickedAt: new Date(),
      },
    });
    res.redirect(302, link.targetUrl);
  } catch (err) {
    next(err);
  }
}
