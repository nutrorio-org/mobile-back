import { Diario } from '../../schema/diario.schema';
import { prisma } from '../prisma';

export async function createDiarioAlimentar(diario: Diario, patientId: string) {
  try {
    return await prisma.diarioAlimentar.create({
      data: { ...diario, patientId },
    });
  } catch (error) {
    return null;
  }
}
