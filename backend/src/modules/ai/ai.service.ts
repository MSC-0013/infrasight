import OpenAI from 'openai';
import { config } from '../../core/config/index.js';
import { AppError } from '../../core/errors/app-error.js';
import { prisma } from '../../core/database/prisma.js';

const openai = config.openai.enabled
  ? new OpenAI({ apiKey: config.openai.apiKey })
  : null;

export const aiService = {
  async analyzeIncident(orgId: string, incidentId: string) {
    const incident = await prisma.incident.findFirst({
      where: { id: incidentId, orgId },
      include: { timeline: true },
    });
    if (!incident) throw AppError.notFound('Incident not found');

    const context = JSON.stringify({
      title: incident.title,
      severity: incident.severity,
      service: incident.service,
      timeline: incident.timeline,
    });

    let summary = 'AI analysis unavailable — set OPENAI_API_KEY to enable.';
    let rootCause = 'Unknown';
    let recommendations: string[] = [];

    if (openai) {
      const completion = await openai.chat.completions.create({
        model: config.openai.model,
        messages: [
          {
            role: 'system',
            content: 'You are an SRE assistant. Provide concise RCA JSON with keys: summary, rootCause, recommendations (array).',
          },
          { role: 'user', content: context },
        ],
        response_format: { type: 'json_object' },
      });
      const parsed = JSON.parse(completion.choices[0]?.message?.content ?? '{}') as {
        summary?: string;
        rootCause?: string;
        recommendations?: string[];
      };
      summary = parsed.summary ?? summary;
      rootCause = parsed.rootCause ?? rootCause;
      recommendations = parsed.recommendations ?? [];
    }

    const insight = await prisma.aiInsight.create({
      data: {
        orgId,
        type: 'rca',
        title: `RCA: ${incident.title}`,
        description: summary,
        severity: incident.severity,
        service: incident.service,
        rawResponse: { summary, rootCause, recommendations },
      },
    });

    return { summary, rootCause, recommendations, aiGenerated: Boolean(openai), insightId: insight.id };
  },

  async listInsights(orgId: string) {
    return prisma.aiInsight.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  },
};
