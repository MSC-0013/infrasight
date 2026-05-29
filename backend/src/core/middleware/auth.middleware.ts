import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../database/prisma.js';
import { AppError } from '../errors/app-error.js';
import { verifyAccessToken } from '../utils/jwt.js';
import type { AuthUser } from '../../types/index.js';

function extractBearer(request: FastifyRequest): string | null {
  const auth = request.headers.authorization;
  if (auth?.startsWith('Bearer ')) {
    return auth.slice(7);
  }
  const cookieToken = (request.cookies as Record<string, string> | undefined)?.accessToken;
  return cookieToken ?? null;
}

export async function authenticate(
  request: FastifyRequest,
  _reply: FastifyReply,
): Promise<void> {
  const token = extractBearer(request);
  if (!token) {
    throw AppError.unauthorized('Missing authentication token');
  }

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw AppError.unauthorized('Invalid or expired token');
  }

  const user = await prisma.user.findFirst({
    where: { id: payload.sub, isActive: true },
    select: { id: true, email: true, name: true, role: true, orgId: true },
  });

  if (!user) {
    throw AppError.unauthorized('User not found');
  }

  const authUser: AuthUser = {
    ...user,
    permissions: payload.permissions,
  };

  request.user = authUser;
  request.orgId = user.orgId;
}

export function optionalAuth(
  request: FastifyRequest,
  _reply: FastifyReply,
  done: (err?: Error) => void,
): void {
  const token = extractBearer(request);
  if (!token) {
    done();
    return;
  }

  authenticate(request, _reply)
    .then(() => done())
    .catch(() => done());
}
