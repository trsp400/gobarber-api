import appointmentsRoutes from './appointments.routes';

export default async function routes (fastify, options) {
  fastify.register(appointmentsRoutes, {prefix: '/appointments'});  
}