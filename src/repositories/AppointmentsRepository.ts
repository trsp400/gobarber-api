import {isEqual} from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentRepository {
  appointments: Appointment[];

  constructor () {
    this.appointments = [];
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment({provider, date});

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {    
    
    const findAppointmentByDate = this.appointments.find( appointment => isEqual(appointment.date, date) );    

    return findAppointmentByDate || null ;
  }

  public all():Appointment[] | null {
    return this.appointments;
  }

}

export default AppointmentRepository;