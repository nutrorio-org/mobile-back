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
}
