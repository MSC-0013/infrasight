import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { authController } from './auth.controller.js';

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', (req, reply) => authController.register(req, reply));
  app.post('/login', (req, reply) => authController.login(req, reply));
  app.post('/refresh', (req, reply) => authController.refresh(req, reply));
  app.post('/logout', (req, reply) => authController.logout(req, reply));
  app.post('/forgot-password', (req, reply) => authController.forgotPassword(req, reply));
  app.post('/reset-password', (req, reply) => authController.resetPassword(req, reply));

  app.get('/me', { preHandler: authenticate }, (req, reply) => authController.me(req, reply));
}
