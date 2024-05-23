import { prisma } from '../prisma';

export class QuestionarioService {
  async list(patientId: string) {
    try {
      return await prisma.answers.findMany({
        where: {
          patientId,
        },
      });
    } catch (error) {
      return [];
    }
  }
  async find(id: string) {
    try {
      return await prisma.answers.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      return null;
    }
  }
}
