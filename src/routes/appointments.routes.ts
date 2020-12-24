import {
  FastifyRequest,
  FastifyInstance,
  RouteShorthandOptions,
  HookHandlerDoneFunction,
  FastifyReply,
} from 'fastify';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import { RouteGenericInterface } from 'fastify/types/route';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import verifyAuthenticationMiddleware from '../middlewares/verifyAuthentication';

type CustomRequest = FastifyRequest<{
  Body: { provider_id: string; date: string };
}>;

export default async function appointmentsRoutes(
  server: FastifyInstance,
  options: RouteShorthandOptions,
  next: HookHandlerDoneFunction,
) {
  server.post<RouteGenericInterface>(
    `/`,
    { preValidation: [verifyAuthenticationMiddleware] },
    async (request: CustomRequest, reply: FastifyReply) => {
      try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const data = {
          provider_id,
          date: parsedDate,
        };

        const createAppointmentService = new CreateAppointmentService();

        const appointment = await createAppointmentService.execute(data);

        if (!appointment)
          return reply
            .status(400)
            .send({ message: 'This time is already booked' });

        return reply.status(200).send({ appointment });
      } catch (error) {
        return reply.status(400).send({
          message: error.message,
        });
      }
    },
  );

  server.get(
    `/`,
    { preValidation: [verifyAuthenticationMiddleware] },
    async (request: FastifyRequest, response: FastifyReply) => {
      const appointmentsRepository = getCustomRepository(
        AppointmentsRepository,
      );
      const appointments = await appointmentsRepository.find();
      response.send({ appointments });
    },
  );

  next();
}
