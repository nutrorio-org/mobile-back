import { AnthropometricExam } from '../domain/AnthropometricExam';
import { AnthropometricExamDatabase } from '../interfaces/AnthropometricExamDatabase';
import { prisma } from './prisma';

export class AnthropometricExamService implements AnthropometricExamDatabase {
  async findGraphicList(itemsId: string[]): Promise<any> {
    return await prisma.exameAvaliacaoAntropometrica.findMany({
      where: {
        id: {
          in: itemsId,
        },
      },
    });
  }
  async list(patientId: string): Promise<AnthropometricExam[]> {
    try {
      const result = await prisma.exameAvaliacaoAntropometrica.findMany({
        where: {
          patientId,
        },
      });
      return result.map((exame) => {
        return new AnthropometricExam(exame.id, exame.date, exame.title);
      });
    } catch (error) {
      return [];
    }
  }
  async findById(id: string): Promise<any> {
    try {
      return await prisma.exameAvaliacaoAntropometrica.findFirst({
        where: {
          id,
        },
      });
    } catch (error) {
      return null;
    }
  }
}
