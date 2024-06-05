import { z } from 'zod';

const AnswerSchema = z.array(z.string());

const DataSchema = z.object({
  title: z.string(),
  answer: AnswerSchema,
});

const QuestionSchema = z.object({
  id: z.string(),
  questionaryName: z.string(),
  data: z.any(),
  patientId: z.string(),
  result: z.string(),
});

type QuestionType = z.infer<typeof QuestionSchema>;

export class Question {
  id: string;
  questionaryName: string;
  data: any[];
  patientId: string;
  result: string;

  constructor(data: QuestionType) {
    this.id = data.id;
    this.questionaryName = data.questionaryName;
    this.data = data.data;
    this.patientId = data.patientId;
    this.result = data.result;
  }

  static create(data: QuestionType) {
    return new Question(data);
  }
}
