import { z } from 'zod';

export const diarioSchema = z.object({
  id: z.string(),
  date: z.string(),
  title: z.string(),
  description: z.string(),
  photos: z.string().array().optional(),
  comments: z.string().optional(),
  emoji: z.enum(['like', 'heart', 'hand']).optional(),
});
export type Diario = z.infer<typeof diarioSchema>;
