import { prisma } from '../prisma';

export class PlanoAlimentarService {
  async list(patientId: string) {
    try {
      return await prisma.foodPlan.findMany({
        where: {
          patientId,
        },
      });
    } catch (error) {
      return [];
    }
  }
}
