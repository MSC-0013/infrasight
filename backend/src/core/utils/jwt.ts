import jwt from 'jsonwebtoken';
import { createHash, randomUUID } from 'crypto';
import { config } from '../config/index.js';
import type { JwtPayload } from '../../types/index.js';
import type { UserRole } from '@prisma/client';
import { getPermissionsForRole } from './rbac.js';

export function signAccessToken(payload: {
  sub: string;
  email: string;
  role: UserRole;
  orgId: string;
}): string {
  const jwtPayload: JwtPayload = {
    ...payload,
    permissions: getPermissionsForRole(payload.role),
  };

  const options: jwt.SignOptions = {
    expiresIn: config.jwt.accessExpires as jwt.SignOptions['expiresIn'],
    algorithm: config.jwt.useRs256 ? 'RS256' : 'HS256',
  };

  if (config.jwt.useRs256 && config.jwt.privateKey) {
    return jwt.sign(jwtPayload, config.jwt.privateKey, options);
  }

  return jwt.sign(jwtPayload, config.jwt.secret, options);
}

export function verifyAccessToken(token: string): JwtPayload {
  const options: jwt.VerifyOptions = {
    algorithms: config.jwt.useRs256 ? ['RS256'] : ['HS256'],
  };

  const key = config.jwt.useRs256 && config.jwt.publicKey
    ? config.jwt.publicKey
    : config.jwt.secret;

  return jwt.verify(token, key, options) as JwtPayload;
}

export function generateRefreshToken(): string {
  return randomUUID() + randomUUID().replace(/-/g, '');
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}
