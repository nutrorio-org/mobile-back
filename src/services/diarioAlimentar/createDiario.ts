import { Diario } from '../../schema/diario.schema';
import { prisma } from '../prisma';

export async function createDiarioAlimentar(diario: Diario, patientId: string) {
  try {
    return await prisma.diarioAlimentar.create({
      data: {
        date: diario.date,
        description: diario.description ?? '',
        title: diario.title,
        comments: diario.comments ?? '',
        emoji: diario.emoji ?? 'none',
        photos: diario.photos ?? [],
        patientId,
      },
    });
  } catch (error) {
    return null;
  }
}
