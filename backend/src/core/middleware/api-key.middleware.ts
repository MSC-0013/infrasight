import type { FastifyReply, FastifyRequest } from 'fastify';
import { createHash } from 'crypto';
import { prisma } from '../database/prisma.js';
import { AppError } from '../errors/app-error.js';
import { getPermissionsForRole } from '../utils/rbac.js';

export async function authenticateApiKey(
  request: FastifyRequest,
  _reply: FastifyReply,
): Promise<void> {
  const key = request.headers['x-api-key'] as string | undefined;
  if (!key) {
    throw AppError.unauthorized('Missing API key');
  }

  const keyHash = createHash('sha256').update(key).digest('hex');
  const apiKey = await prisma.apiKey.findFirst({
    where: { keyHash, revoked: false },
    include: { creator: { select: { id: true, email: true, name: true, role: true, orgId: true } } },
  });

  if (!apiKey) {
    throw AppError.unauthorized('Invalid API key');
  }

  if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
    throw AppError.unauthorized('API key expired');
  }

  await prisma.apiKey.update({
    where: { id: apiKey.id },
    data: { lastUsedAt: new Date() },
  });

  request.user = {
    id: apiKey.creator.id,
    email: apiKey.creator.email,
    name: apiKey.creator.name,
    role: apiKey.creator.role,
    orgId: apiKey.orgId,
    permissions: apiKey.permissions.length > 0
      ? apiKey.permissions
      : getPermissionsForRole(apiKey.creator.role),
  };
  request.orgId = apiKey.orgId;
}
