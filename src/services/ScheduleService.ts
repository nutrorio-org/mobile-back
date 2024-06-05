import { Schedule } from '../domain/Schedule';
import { ScheduleDatabase } from '../interfaces/ScheduleDatabase';
import { prisma } from './prisma';

export class ScheduleServices implements ScheduleDatabase {
  async get(patientId: string): Promise<Schedule[]> {
    const schedules: any = await prisma.event.findMany({
      where: {
        patientId,
        status: 'Consulta Confirmada',
      },
    });
    return Schedule.createMany(schedules);
  }
}
