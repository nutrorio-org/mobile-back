import { UpdateDiario } from '../../schema/diario.schema';
import { prisma } from '../prisma';

export async function updateDiarioAlimentar(diario: UpdateDiario, id: string) {
  try {
    return await prisma.diarioAlimentar.update({
      where: {
        id,
      },
      data: { ...diario },
    });
  } catch (error) {
    return null;
  }
}
