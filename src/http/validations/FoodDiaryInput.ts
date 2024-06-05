import { z } from 'zod';

export class FoodDiaryInput {
  Create(input: any) {
    const schema = z.object({
      date: z.string(),
      title: z.string(),
      description: z.string(),
      photos: z.string().array().optional(),
    });
    const validate = schema.safeParse(input);
    if (validate.success) return validate.data;
    return null;
  }
}
