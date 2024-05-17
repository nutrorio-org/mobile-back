import { prisma } from '../prisma';

export async function deleteDiarioAlimentar(id: string) {
  try {
    return await prisma.diarioAlimentar.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return null;
  }
}
