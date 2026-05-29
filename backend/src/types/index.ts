import type { UserRole } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  orgId: string;
  permissions: string[];
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  orgId: string;
  permissions: string[];
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: AuthUser;
    orgId?: string;
  }
}
