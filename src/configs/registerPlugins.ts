/* eslint-disable global-require */
import multer from 'fastify-multer';
import path from 'path';
import { FastifyInstance } from 'fastify';

export default async function (server: FastifyInstance) {
  server.register(require('fastify-cors'));
  await server.register(require('middie'));

  server.register(multer.contentParser);
  server.register(require('fastify-static'), {
    root: path.join(__dirname, '..', '..', 'temp'),
    prefix: '/public',
  });

  server.register(require('fastify-oas'), {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'GoBarber 13',
        description: 'GoBarber Documentation.',
        version: '0.1',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  });

  server.register(require('../routes'));
}
