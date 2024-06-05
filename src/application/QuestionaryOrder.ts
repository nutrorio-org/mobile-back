import { Question } from '../domain/Question';
import { QuestionPending } from '../domain/QuestionPending';
import { QuestionsDescription } from '../domain/QuestionsDescription';
import { QuestionaryDatabase } from '../interfaces/QuestionaryDatabase';
export class QuestionaryOrder {
  constructor(readonly questionaryService: QuestionaryDatabase) {
    this.questionaryService = questionaryService;
  }
  async getDescriptions(patientId: string) {
    const questions = await this.questionaryService.list(patientId);
    const descriptions: QuestionsDescription[] =
      this.addDescriptions(questions);
    return descriptions;
  }
  private addDescriptions(data: any) {
    const descriptions: QuestionsDescription[] = [];
    for (let q of data) {
      const questionsDescription = QuestionsDescription.create({
        id: q.id,
        questionaryName: q.questionaryName,
      });
      descriptions.push(questionsDescription);
    }
    return descriptions;
  }

  async getCompleted(id: string) {
    const result = await this.questionaryService.find(id);
    if (!result) return result;
    return Question.create({
      id: result.id,
      patientId: result.patientId,
      questionaryName: result.questionaryName,
      result: result.result ?? '',
      data: result.data,
    });
  }
  async getPending(patientId: string): Promise<QuestionPending[]> {
    const pending =
      await this.questionaryService.getQuestiosPendents(patientId);
    if (!pending) return [];
    return this.addQuestionsPending(pending);
  }
  private addQuestionsPending(data: any) {
    const pendings: QuestionPending[] = [];
    for (let q of data) {
      const questionsPending = QuestionPending.create({
        id: q.id,
        patientId: q.patientId,
        questionarioId: q.questionarioId,
        title: q.title,
      });
      pendings.push(questionsPending);
    }
    return pendings;
  }
}
