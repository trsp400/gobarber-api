import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';

export default async function routes(fastify, options) {
  fastify.register(appointmentsRoutes, { prefix: '/appointments' });
  fastify.register(usersRoutes, { prefix: '/users' });
}
