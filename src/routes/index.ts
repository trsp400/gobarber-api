import { FastifyInstance } from 'fastify';
import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';
import sessionsRoutes from './sessions.routes';

export default async function routes(fastify: FastifyInstance) {
  fastify.register(appointmentsRoutes, { prefix: '/appointments' });
  fastify.register(usersRoutes, { prefix: '/users' });
  fastify.register(sessionsRoutes, { prefix: '/sessions' });
}
