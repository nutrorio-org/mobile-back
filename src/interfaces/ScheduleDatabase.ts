import { Schedule } from '../domain/Schedule';

export interface ScheduleDatabase {
  get(patientId: string): Promise<Schedule[]>;
}
