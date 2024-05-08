import { prisma } from '../prisma';

export async function getDiariosAlimentares(patientId: string) {
  try {
    return await prisma.diarioAlimentar.findMany({
      where: {
        patientId,
      },
    });
  } catch (error) {
    return [];
  }
}
