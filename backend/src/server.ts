import { buildApp } from './app.js';
import { config } from './core/config/index.js';
import { connectDatabase, disconnectDatabase } from './core/database/prisma.js';
import { connectRedis, disconnectRedis } from './core/redis/client.js';
import { startWorkers, stopWorkers } from './core/queue/workers.js';

async function main() {
  await connectDatabase();
  await connectRedis();

  if (config.features.bullmq) {
    await startWorkers();
  }

  const app = await buildApp();

  const shutdown = async (signal: string) => {
    app.log.info(`Received ${signal}, shutting down...`);
    await app.close();
    await stopWorkers();
    await disconnectRedis();
    await disconnectDatabase();
    process.exit(0);
  };

  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));

  await app.listen({ port: config.port, host: config.host });
  app.log.info(`Pulse API listening on http://${config.host}:${config.port}`);
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
