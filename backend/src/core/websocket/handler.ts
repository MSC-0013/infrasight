import type { FastifyInstance } from 'fastify';
import { getRedisSubscriber, REDIS_CHANNELS } from '../redis/client.js';
import { verifyAccessToken } from '../utils/jwt.js';

const ALL_CHANNELS = Object.values(REDIS_CHANNELS);

export async function registerWebSocket(app: FastifyInstance) {
  const subscriber = getRedisSubscriber();
  await subscriber.subscribe(...ALL_CHANNELS);

  app.get('/ws', { websocket: true }, (socket, request) => {
    const token = (request.query as { token?: string }).token;
    if (!token) {
      socket.close(4001, 'Missing token');
      return;
    }

    try {
      verifyAccessToken(token);
    } catch {
      socket.close(4001, 'Invalid token');
      return;
    }

    const channels = new Set<string>();
    const subscribed = (channel: string, message: string) => {
      if (channels.size === 0 || channels.has(channel)) {
        socket.send(JSON.stringify({ channel, data: JSON.parse(message) }));
      }
    };

    for (const ch of ALL_CHANNELS) {
      subscriber.on('message', (channel, message) => {
        if (channel === ch) subscribed(channel, message);
      });
    }

    socket.on('message', (raw) => {
      try {
        const msg = JSON.parse(raw.toString()) as { action: string; channels?: string[] };
        if (msg.action === 'subscribe' && msg.channels) {
          msg.channels.forEach((c) => channels.add(c));
          socket.send(JSON.stringify({ type: 'subscribed', channels: [...channels] }));
        }
      } catch {
        socket.send(JSON.stringify({ type: 'error', message: 'Invalid message' }));
      }
    });

    socket.send(JSON.stringify({ type: 'connected', channels: ALL_CHANNELS }));
  });
}
