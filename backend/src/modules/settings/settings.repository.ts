import { prisma } from '../../core/database/prisma.js';

export const settingsRepository = {
  get: (orgId: string) => prisma.orgSettings.findUnique({ where: { orgId } }),
  upsert: (orgId: string, data: { notificationPrefs?: object; retentionDays?: number }) =>
    prisma.orgSettings.upsert({
      where: { orgId },
      create: { orgId, ...data, notificationPrefs: data.notificationPrefs ?? {} },
      update: data,
    }),
  listApiKeys: (orgId: string) =>
    prisma.apiKey.findMany({ where: { orgId, revoked: false }, select: { id: true, name: true, keyPrefix: true, permissions: true, lastUsedAt: true, expiresAt: true, createdAt: true } }),
};
