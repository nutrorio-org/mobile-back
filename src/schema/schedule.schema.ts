import { z } from 'zod';

export const scheduleSchema = z.object({
  id: z.string(),
  start: z.string(),
});
export const listSchedules = scheduleSchema.array();
export type ListaSchedules = z.infer<typeof listSchedules>;
