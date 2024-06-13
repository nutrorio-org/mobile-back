import { AnthropometricExam } from '../../domain/AnthropometricExam';
import { CreatePatient } from '../../factory/CratePatient';
import { AnthropometricExamDatabase } from '../../interfaces/AnthropometricExamDatabase';

export class AnthropometricExamFakeService
  implements AnthropometricExamDatabase
{
  patients: { id: string; exames: AnthropometricExam[] }[] = [];
  constructor() {
    const data = new AnthropometricExam(
      'qwertyuiop',
      new Date('2024-05-21T13:43:01.996Z'),
      'test'
    );
    const p = CreatePatient();
    const patient = { id: p.id, exames: [data] };
    this.patients.push(patient);
  }
  async list(patientId: string): Promise<AnthropometricExam[]> {
    const patient = this.patients.find((v) => {
      return v.id === patientId;
    });
    if (!patient) return [];
    return patient.exames;
  }
  async findById(id: string): Promise<any> {
    return this.patients[0].exames.find((v) => {
      return v.id === id;
    });
  }
}
