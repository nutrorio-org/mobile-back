import ExamGraphic from '../domain/ExamGraphic';
import { AnthropometricExamDatabase } from '../interfaces/AnthropometricExamDatabase';

export class AnthropometricExaminationOrder {
  private anthropometricExamService: AnthropometricExamDatabase;
  constructor(anthropometricExamService: AnthropometricExamDatabase) {
    this.anthropometricExamService = anthropometricExamService;
  }
  async list(patientId: string) {
    return await this.anthropometricExamService.list(patientId);
  }
  async findById(id: string) {
    return await this.anthropometricExamService.findById(id);
  }
  async findGraphicList(itemsId: string[]) {
    const exames =
      await this.anthropometricExamService.findGraphicList(itemsId);
    const examGraph: ExamGraphic[] = [];
    for (let item of exames) {
      examGraph.push(
        new ExamGraphic(item.date, item.MassaGordaKG, item.MassaMagraKG)
      );
    }
    return examGraph;
  }
}
