import { AnthropometricExamService } from '../services/AnthropometricExamService';

export class AnthropometricExaminationOrder {
  constructor(readonly anthropometricExamService: AnthropometricExamService) {
    this.anthropometricExamService = anthropometricExamService;
  }
  async list(patientId: string) {
    return await this.anthropometricExamService.list(patientId);
  }
  async findById(id: string) {
    return await this.anthropometricExamService.findById(id);
  }
}
