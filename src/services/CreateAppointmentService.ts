import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentRepository;

  constructor(appointmentsRepository: AppointmentRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentByDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentByDate) throw new Error('This time is already booked');

    const appointment = this.appointmentsRepository.create(
      provider,
      appointmentDate,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
