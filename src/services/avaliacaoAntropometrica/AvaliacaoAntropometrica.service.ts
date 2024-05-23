import { prisma } from '../prisma';

export class AvaliacaoAntropometricaService {
  async list(patientId: string) {
    try {
      return await prisma.exameAvaliacaoAntropometrica.findMany({
        where: {
          patientId,
        },
      });
    } catch (error) {
      return [];
    }
  }
  async findById(id: string) {
    try {
      console.log(id);
      return await prisma.exameAvaliacaoAntropometrica.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      return null;
    }
  }
}
