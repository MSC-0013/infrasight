import type { Prisma } from '@prisma/client';
import { prisma } from '../../core/database/prisma.js';
import { paginate } from '../../core/utils/pagination.js';
import type { ListQuery } from './deployments.schema.js';
import type { z } from 'zod';
import type { createDeploymentSchema } from './deployments.schema.js';

type CreateInput = z.infer<typeof createDeploymentSchema>;

export const deploymentsRepository = {
  async findMany(orgId: string, q: ListQuery) {
    const { skip, take } = paginate(q);
    const where: Prisma.DeploymentWhereInput = {
      orgId,
      ...(q.service && { service: q.service }),
      ...(q.environment && { environment: q.environment }),
    };
    const [items, total] = await Promise.all([
      prisma.deployment.findMany({ where, skip, take, orderBy: { startedAt: 'desc' } }),
      prisma.deployment.count({ where }),
    ]);
    return { items, total, page: q.page, pageSize: q.pageSize };
  },

  findById: (orgId: string, id: string) =>
    prisma.deployment.findFirst({ where: { id, orgId } }),

  create: (orgId: string, data: CreateInput, userEmail: string) =>
    prisma.deployment.create({
      data: {
        orgId,
        service: data.service,
        version: data.version,
        environment: data.environment,
        sha: data.sha,
        branch: data.branch,
        triggeredBy: data.triggeredBy ?? userEmail,
        status: 'running',
      },
    }),

  updateStatus: (orgId: string, id: string, status: Prisma.DeploymentUpdateInput['status']) =>
    prisma.deployment.updateMany({
      where: { id, orgId },
      data: { status, completedAt: status === 'success' || status === 'failed' ? new Date() : undefined },
    }),
};
