import { z } from 'zod';

export const diarioSchema = z.object({
  id: z.string().optional(),
  date: z.string(),
  title: z.string(),
  description: z.string().optional(),
  photos: z.string().array().optional(),
  comments: z.string().optional(),
  emoji: z.enum(['like', 'heart', 'hand', 'none']).optional().default('none'),
});
export const updateDiarioSchema = z.object({
  date: z.string(),
  title: z.string(),
  description: z.string(),
  photos: z.string().array().optional(),
});
export type Diario = z.infer<typeof diarioSchema>;
export type UpdateDiario = z.infer<typeof updateDiarioSchema>;
