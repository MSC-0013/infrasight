import type { FastifyReply, FastifyRequest } from 'fastify';
import { success } from '../../core/utils/response.js';
import {
  forgotPasswordSchema,
  loginSchema,
  refreshSchema,
  registerSchema,
  resetPasswordSchema,
} from './auth.schema.js';
import { authService } from './auth.service.js';

export class AuthController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    const body = registerSchema.parse(request.body);
    const result = await authService.register(body);
    return reply.status(201).send(success(result));
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const body = loginSchema.parse(request.body);
    const result = await authService.login(body, {
      userAgent: request.headers['user-agent'],
      ip: request.ip,
    });
    return reply.send(success(result));
  }

  async refresh(request: FastifyRequest, reply: FastifyReply) {
    const { refreshToken } = refreshSchema.parse(request.body);
    const result = await authService.refresh(refreshToken);
    return reply.send(success(result));
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    const { refreshToken } = refreshSchema.parse(request.body);
    await authService.logout(refreshToken);
    return reply.send(success({ ok: true }));
  }

  async me(request: FastifyRequest, reply: FastifyReply) {
    const user = await authService.me(request.user!.id);
    return reply.send(success(user));
  }

  async forgotPassword(request: FastifyRequest, reply: FastifyReply) {
    forgotPasswordSchema.parse(request.body);
    return reply.send(success({ message: 'If the email exists, a reset link was sent' }));
  }

  async resetPassword(request: FastifyRequest, reply: FastifyReply) {
    resetPasswordSchema.parse(request.body);
    return reply.send(success({ message: 'Password updated' }));
  }
}

export const authController = new AuthController();
