import { z } from 'zod';

const QuestionsDescriptionSchema = z.object({
  id: z.string(),
  questionaryName: z.string(),
});
// .array();
type QuestionsDescriptionType = z.infer<typeof QuestionsDescriptionSchema>;

export class QuestionsDescription {
  constructor(
    readonly id: string,
    readonly questionaryName: string
  ) {}
  static create(data: QuestionsDescriptionType) {
    return new QuestionsDescription(data.id, data.questionaryName);
  }
}
