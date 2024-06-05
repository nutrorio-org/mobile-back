import { z } from 'zod';

const QuestionPendingSchema = z.object({
  id: z.string(),
  title: z.string(),
  patientId: z.string(),
  questionarioId: z.string(),
});
type QuestionPendingType = z.infer<typeof QuestionPendingSchema>;
export class QuestionPending {
  id: string;
  title: string;
  patientId: string;
  questionarioId: string;
  constructor({ id, title, patientId, questionarioId }: QuestionPendingType) {
    this.id = id;
    this.title = title;
    this.patientId = patientId;
    this.questionarioId = questionarioId;
  }
  static create(data: QuestionPendingType) {
    return new QuestionPending(data);
  }
}
