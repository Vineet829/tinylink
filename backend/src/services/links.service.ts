import prisma from '../prisma/client';
import { isValidUrl, isValidCode } from '../utils/validators';
import { randomInt } from 'crypto';

function generateShortCode(): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += charset[randomInt(0, charset.length)];
  }
  return result;
}

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
  const finalCode = code || generateShortCode();
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

export async function redirectForCode(code: string) {
  const link = await prisma.link.findUnique({ where: { code } });
  if (!link) {
    return null;
  }
  await prisma.link.update({
    where: { code },
    data: {
      totalClicks: { increment: 1 },
      lastClickedAt: new Date(),
    },
  });
  return link.targetUrl;
}
