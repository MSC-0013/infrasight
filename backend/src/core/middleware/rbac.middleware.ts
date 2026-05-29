import type { FastifyReply, FastifyRequest } from 'fastify';
import type { UserRole } from '@prisma/client';
import { AppError } from '../errors/app-error.js';
import { hasPermission } from '../utils/rbac.js';

export function requirePermission(...permissions: string[]) {
  return async (request: FastifyRequest, _reply: FastifyReply): Promise<void> => {
    if (!request.user) {
      throw AppError.unauthorized();
    }
    const ok = permissions.some((p) =>
      request.user!.permissions.includes(p) || hasPermission(request.user!.role, p),
    );
    if (!ok) {
      throw AppError.forbidden('Insufficient permissions');
    }
  };
}

export function requireRole(...roles: UserRole[]) {
  return async (request: FastifyRequest, _reply: FastifyReply): Promise<void> => {
    if (!request.user) {
      throw AppError.unauthorized();
    }
    if (!roles.includes(request.user.role)) {
      throw AppError.forbidden('Insufficient role');
    }
  };
}
