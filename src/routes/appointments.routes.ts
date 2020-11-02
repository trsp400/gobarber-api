import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import {parseISO} from 'date-fns';

const appointmentsRepository = new AppointmentsRepository();

export default async function appointmentsRoutes(server, options, next){

  server.post(`/`, (req, res) => {
    try {
      const {provider, date} = req.body;

      const parsedDate = parseISO(date);

      const data = {
        provider,
        date: parsedDate,
      }

      const createAppointmentService = new CreateAppointmentService(appointmentsRepository);
      const appointment = createAppointmentService.execute(data);

      if(!appointment) return res.status(400).send({ message: 'This time is already booked' });


      return res.send({appointment});
    } catch (error) {
      return res.status(400).send({
        message: error.message
      })
    }
  })

  server.get(`/`, (req, res) => {
    const appointments = appointmentsRepository.all()
    res.send({ appointments});
  });

  next()
};
