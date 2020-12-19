import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

export default async function appointmentsRoutes(server, options, next) {
  server.post(`/`, async (req, res) => {
    try {
      const { provider, date } = req.body;

      const parsedDate = parseISO(date);

      const data = {
        provider,
        date: parsedDate,
      };

      const createAppointmentService = new CreateAppointmentService();

      const appointment = await createAppointmentService.execute(data);

      if (!appointment)
        return res.status(400).send({ message: 'This time is already booked' });

      return res.send({ appointment });
    } catch (error) {
      return res.status(400).send({
        message: error.message,
      });
    }
  });

  server.get(`/`, (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = appointmentsRepository.find();
    res.send({ appointments });
  });

  next();
}
