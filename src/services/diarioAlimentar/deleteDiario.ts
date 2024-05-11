import { Diario } from '../../schema/diario.schema';
import { prisma } from '../prisma';

export async function deleteDiarioAlimentar(patientId: string) {
  try {
    return await prisma.diarioAlimentar.deleteMany({
      where: {
        patientId,
      },
    });
  } catch (error) {
    return null;
  }
}
