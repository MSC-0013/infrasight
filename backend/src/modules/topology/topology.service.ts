import { prisma } from '../../core/database/prisma.js';

export const topologyService = {
  async getGraph(orgId: string) {
    const [nodes, edges] = await Promise.all([
      prisma.topologyNode.findMany({ where: { orgId } }),
      prisma.topologyEdge.findMany({ where: { orgId } }),
    ]);
    return { nodes, edges, generatedAt: new Date().toISOString() };
  },

  async discover(orgId: string) {
    const spans = await prisma.span.findMany({
      where: { orgId },
      take: 1000,
      orderBy: { startTime: 'desc' },
    });

    const services = [...new Set(spans.map((s) => s.service))];
    for (const svc of services) {
      await prisma.topologyNode.upsert({
        where: { orgId_nodeId: { orgId, nodeId: svc } },
        create: { orgId, nodeId: svc, label: svc, service: svc },
        update: {},
      });
    }

    return this.getGraph(orgId);
  },
};
