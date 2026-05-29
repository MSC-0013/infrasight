import type { FastifyReply, FastifyRequest } from 'fastify';
import { paginatedResponse } from '../../core/utils/pagination.js';
import { success } from '../../core/utils/response.js';
import {
  batchEventsSchema,
  createEventSchema,
  eventFilterSchema,
  idParamSchema,
} from './events.schema.js';
import { eventsService } from './events.service.js';

export class EventsController {
  async list(req: FastifyRequest, reply: FastifyReply) {
    const filter = eventFilterSchema.parse(req.query);
    const result = await eventsService.list(req.orgId!, filter);
    return reply.send(
      success(paginatedResponse(result.items, result.total, result.page, result.pageSize)),
    );
  }

  async get(req: FastifyRequest, reply: FastifyReply) {
    const { id } = idParamSchema.parse(req.params);
    return reply.send(success(await eventsService.get(req.orgId!, id)));
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    const body = createEventSchema.parse(req.body);
    const event = await eventsService.create(req.orgId!, body);
    return reply.status(201).send(success(event));
  }

  async batch(req: FastifyRequest, reply: FastifyReply) {
    const { events } = batchEventsSchema.parse(req.body);
    return reply.status(201).send(success(await eventsService.batch(req.orgId!, events)));
  }

  async stats(req: FastifyRequest, reply: FastifyReply) {
    const q = req.query as { from?: string; to?: string };
    return reply.send(
      success(
        await eventsService.stats(
          req.orgId!,
          q.from ? new Date(q.from) : undefined,
          q.to ? new Date(q.to) : undefined,
        ),
      ),
    );
  }

  async remove(req: FastifyRequest, reply: FastifyReply) {
    const { id } = idParamSchema.parse(req.params);
    return reply.send(success(await eventsService.remove(req.orgId!, id)));
  }
}

export const eventsController = new EventsController();
