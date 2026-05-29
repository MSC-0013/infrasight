import Redis from 'ioredis';
import { config } from '../config/index.js';

let redis: Redis | null = null;
let subscriber: Redis | null = null;

export function getRedis(): Redis {
  if (!redis) {
    redis = new Redis(config.redis.url, {
      maxRetriesPerRequest: null,
      lazyConnect: true,
    });
  }
  return redis;
}

export function getRedisSubscriber(): Redis {
  if (!subscriber) {
    subscriber = new Redis(config.redis.url, {
      maxRetriesPerRequest: null,
      lazyConnect: true,
    });
  }
  return subscriber;
}

export async function connectRedis(): Promise<void> {
  const client = getRedis();
  if (client.status !== 'ready' && client.status !== 'connecting') {
    await client.connect();
  }
  const sub = getRedisSubscriber();
  if (sub.status !== 'ready' && sub.status !== 'connecting') {
    await sub.connect();
  }
}

export async function disconnectRedis(): Promise<void> {
  await Promise.all([
    redis?.quit().catch(() => undefined),
    subscriber?.quit().catch(() => undefined),
  ]);
  redis = null;
  subscriber = null;
}

export const REDIS_CHANNELS = {
  eventsLive: 'events:live',
  metricsLive: 'metrics:live',
  alertsLive: 'alerts:live',
  incidentsLive: 'incidents:live',
  workersLive: 'workers:live',
  queuesLive: 'queues:live',
} as const;

export async function publish(channel: string, payload: unknown): Promise<void> {
  await getRedis().publish(channel, JSON.stringify(payload));
}
