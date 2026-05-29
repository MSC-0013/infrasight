import { config } from '../../core/config/index.js';
import { AppError } from '../../core/errors/app-error.js';
import { generateRefreshToken, hashToken, signAccessToken } from '../../core/utils/jwt.js';
import { getPermissionsForRole } from '../../core/utils/rbac.js';
import { authRepository } from './auth.repository.js';
import type { LoginInput, RegisterInput } from './auth.schema.js';

export class AuthService {
  async register(input: RegisterInput) {
    const existing = await authRepository.findByEmail(input.email);
    if (existing) {
      throw AppError.conflict('Email already registered');
    }

    const { user, org } = await authRepository.createUserWithOrg(input);
    const tokens = await this.issueTokens(user.id, user.email, user.role, user.orgId);

    return {
      ...tokens,
      user: this.serializeUser(user, org),
    };
  }

  async login(input: LoginInput, meta?: { userAgent?: string; ip?: string }) {
    const user = await authRepository.findByEmail(input.email);
    if (!user || !user.isActive) {
      throw AppError.unauthorized('Invalid credentials');
    }

    const valid = await authRepository.verifyPassword(user.passwordHash, input.password);
    if (!valid) {
      throw AppError.unauthorized('Invalid credentials');
    }

    await authRepository.updateLastLogin(user.id);
    const tokens = await this.issueTokens(user.id, user.email, user.role, user.orgId, meta);

    return {
      ...tokens,
      user: this.serializeUser(user, user.org),
    };
  }

  async refresh(refreshToken: string) {
    const tokenHash = hashToken(refreshToken);
    const stored = await authRepository.findRefreshToken(tokenHash);
    if (!stored) {
      throw AppError.unauthorized('Invalid refresh token');
    }

    const accessToken = signAccessToken({
      sub: stored.user.id,
      email: stored.user.email,
      role: stored.user.role,
      orgId: stored.user.orgId,
    });

    return {
      accessToken,
      expiresIn: config.jwt.accessExpires,
      user: {
        id: stored.user.id,
        email: stored.user.email,
        name: stored.user.name,
        role: stored.user.role,
        orgId: stored.user.orgId,
        permissions: getPermissionsForRole(stored.user.role),
      },
    };
  }

  async logout(refreshToken: string) {
    await authRepository.revokeRefreshToken(hashToken(refreshToken));
  }

  async me(userId: string) {
    const { prisma } = await import('../../core/database/prisma.js');
    const found = await prisma.user.findUnique({
      where: { id: userId },
      include: { org: true },
    });
    if (!found) throw AppError.notFound('User not found');
    return this.serializeUser(found, found.org);
  }

  private async issueTokens(
    userId: string,
    email: string,
    role: import('@prisma/client').UserRole,
    orgId: string,
    meta?: { userAgent?: string; ip?: string },
  ) {
    const accessToken = signAccessToken({ sub: userId, email, role, orgId });
    const refreshToken = generateRefreshToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + config.jwt.refreshExpiresDays);

    await authRepository.storeRefreshToken(userId, hashToken(refreshToken), expiresAt, meta);

    return {
      accessToken,
      refreshToken,
      expiresIn: config.jwt.accessExpires,
    };
  }

  private serializeUser(
    user: { id: string; email: string; name: string; role: import('@prisma/client').UserRole; orgId: string; avatarUrl?: string | null; createdAt: Date },
    org: { name: string; slug: string },
  ) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      orgId: user.orgId,
      orgName: org.name,
      orgSlug: org.slug,
      avatarUrl: user.avatarUrl,
      permissions: getPermissionsForRole(user.role),
      createdAt: user.createdAt,
    };
  }
}

export const authService = new AuthService();
