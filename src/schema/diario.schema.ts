import { z } from 'zod';

export const diarioSchema = z.object({
  id: z.string().optional(),
  date: z.number(),
  title: z.string(),
  description: z.string().optional(),
  photos: z.string().array().optional(),
  comments: z.string().optional(),
  emoji: z.enum(['like', 'heart', 'hand', 'none']).optional().default('none'),
});
export type Diario = z.infer<typeof diarioSchema>;
