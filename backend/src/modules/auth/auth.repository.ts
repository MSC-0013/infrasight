import bcrypt from 'bcrypt';
import { prisma } from '../../core/database/prisma.js';
import type { RegisterInput } from './auth.schema.js';

const BCRYPT_ROUNDS = 12;

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { org: true },
    });
  }

  async createUserWithOrg(input: RegisterInput) {
    const email = input.email.toLowerCase();
    const slug = (input.organizationName ?? `${input.name}-org`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 48) + '-' + Date.now().toString(36);

    const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);

    return prisma.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: {
          name: input.organizationName ?? `${input.name}'s Organization`,
          slug,
          plan: 'hobby',
        },
      });

      await tx.orgSettings.create({
        data: { orgId: org.id },
      });

      const user = await tx.user.create({
        data: {
          email,
          name: input.name,
          passwordHash,
          role: 'admin',
          orgId: org.id,
          emailVerified: false,
        },
      });

      return { user, org };
    });
  }

  async verifyPassword(hash: string | null, password: string) {
    if (!hash) return false;
    return bcrypt.compare(password, hash);
  }

  async storeRefreshToken(userId: string, tokenHash: string, expiresAt: Date, meta?: { userAgent?: string; ip?: string }) {
    return prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
        userAgent: meta?.userAgent,
        ipAddress: meta?.ip,
      },
    });
  }

  async findRefreshToken(tokenHash: string) {
    return prisma.refreshToken.findFirst({
      where: { tokenHash, revoked: false, expiresAt: { gt: new Date() } },
      include: { user: true },
    });
  }

  async revokeRefreshToken(tokenHash: string) {
    return prisma.refreshToken.updateMany({
      where: { tokenHash },
      data: { revoked: true },
    });
  }

  async revokeAllUserTokens(userId: string) {
    return prisma.refreshToken.updateMany({
      where: { userId, revoked: false },
      data: { revoked: true },
    });
  }

  async updateLastLogin(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  }
}

export const authRepository = new AuthRepository();
