import { z } from 'zod';

const ScheduleSchema = z.object({
  id: z.string(),
  start: z.string(),
});
const SchedulesSchema = ScheduleSchema.array();
export class Schedule {
  constructor(
    readonly id: string,
    readonly start: string
  ) {
    this.id = id;
    this.start = start;
  }
  static create(data: any) {
    const schedule = ScheduleSchema.parse(data);
    return new Schedule(schedule.id, schedule.start);
  }
  static createMany(data: any[]): Schedule[] {
    const parsedValues = SchedulesSchema.parse(data);
    const schedules: Schedule[] = [];
    for (let s of parsedValues) {
      schedules.push(Schedule.create(s));
    }
    return schedules;
  }
}
