import { z } from 'zod';

const answerSchema = z.array(z.string());

const dataSchema = z.object({
  title: z.string(),
  answer: answerSchema,
});

export const questionarySchema = z.object({
  id: z.string(),
  questionaryName: z.string(),
  data: z.array(dataSchema),
  patientId: z.string(),
  result: z.string(),
});

export const titlesQuestionarySchema = z
  .object({
    id: z.string(),
    questionaryName: z.string(),
  })
  .array();
// export type ListQuestionario = z.infer<typeof listQuestionarySchema>;
