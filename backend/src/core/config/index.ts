import { config as loadEnv } from 'dotenv';
import { z } from 'zod';

loadEnv();

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  JWT_SECRET: z.string().min(16).optional(),
  JWT_PRIVATE_KEY: z.string().optional(),
  JWT_PUBLIC_KEY: z.string().optional(),
  JWT_ACCESS_EXPIRES: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_DAYS: z.coerce.number().default(7),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default('gpt-4o-mini'),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().default('noreply@pulse.io'),
  CORS_ORIGIN: z.string().default('http://localhost:5173,http://localhost:8080'),
  ENABLE_AI: z
    .string()
    .transform((v) => v !== 'false')
    .default('true'),
  ENABLE_BULLMQ: z
    .string()
    .transform((v) => v !== 'false')
    .default('true'),
  ENABLE_WEBSOCKET: z
    .string()
    .transform((v) => v !== 'false')
    .default('true'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const env = parsed.data;

export const config = {
  port: env.PORT,
  host: env.HOST,
  nodeEnv: env.NODE_ENV,
  isDev: env.NODE_ENV === 'development',
  isProd: env.NODE_ENV === 'production',
  database: { url: env.DATABASE_URL },
  redis: { url: env.REDIS_URL },
  jwt: {
    secret: env.JWT_SECRET ?? 'dev-only-change-in-production-min-32-chars!!',
    privateKey: env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    publicKey: env.JWT_PUBLIC_KEY?.replace(/\\n/g, '\n'),
    accessExpires: env.JWT_ACCESS_EXPIRES,
    refreshExpiresDays: env.JWT_REFRESH_EXPIRES_DAYS,
    useRs256: Boolean(env.JWT_PRIVATE_KEY && env.JWT_PUBLIC_KEY),
  },
  openai: {
    apiKey: env.OPENAI_API_KEY,
    model: env.OPENAI_MODEL,
    enabled: env.ENABLE_AI && Boolean(env.OPENAI_API_KEY),
  },
  resend: {
    apiKey: env.RESEND_API_KEY,
    from: env.EMAIL_FROM,
  },
  cors: {
    origins: env.CORS_ORIGIN.split(',').map((o) => o.trim()),
  },
  features: {
    ai: env.ENABLE_AI,
    bullmq: env.ENABLE_BULLMQ,
    websocket: env.ENABLE_WEBSOCKET,
  },
} as const;
