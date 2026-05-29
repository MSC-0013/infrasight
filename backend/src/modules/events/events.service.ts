import { prisma } from '../../core/database/prisma.js';
import { AppError } from '../../core/errors/app-error.js';
import { publish, REDIS_CHANNELS } from '../../core/redis/client.js';
import { eventsRepository } from './events.repository.js';
import type { CreateEventInput, EventFilter } from './events.schema.js';

export class EventsService {
  async list(orgId: string, filter: EventFilter) {
    return eventsRepository.findMany(orgId, filter);
  }

  async get(orgId: string, id: string) {
    const event = await eventsRepository.findById(orgId, id);
    if (!event) throw AppError.notFound('Event not found');
    return event;
  }

  async create(orgId: string, input: CreateEventInput) {
    const org = await prisma.organization.findUnique({ where: { id: orgId } });
    if (!org) throw AppError.notFound('Organization not found');
    const event = await eventsRepository.create(orgId, org.name, input);
    await publish(REDIS_CHANNELS.eventsLive, { orgId, event });
    return event;
  }

  async batch(orgId: string, inputs: CreateEventInput[]) {
    const org = await prisma.organization.findUnique({ where: { id: orgId } });
    if (!org) throw AppError.notFound('Organization not found');
    const result = await eventsRepository.createMany(orgId, org.name, inputs);
    await publish(REDIS_CHANNELS.eventsLive, { orgId, count: result.count });
    return { ingested: result.count };
  }

  async stats(orgId: string, from?: Date, to?: Date) {
    return eventsRepository.stats(orgId, from, to);
  }

  async remove(orgId: string, id: string) {
    const result = await eventsRepository.delete(orgId, id);
    if (result.count === 0) throw AppError.notFound('Event not found');
    return { deleted: true };
  }
}

export const eventsService = new EventsService();
