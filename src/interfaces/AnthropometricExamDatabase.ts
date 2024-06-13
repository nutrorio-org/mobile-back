import { AnthropometricExam } from '../domain/AnthropometricExam';

export interface AnthropometricExamDatabase {
  list(patientId: string): Promise<AnthropometricExam[]>;
  findById(id: string): Promise<AnthropometricExam>;
}
