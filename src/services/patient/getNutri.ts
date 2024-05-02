import { prisma } from '../prisma';

export async function getNutri(id: string) {
  try {
    return await prisma.patient.findFirst({
      where: { id },
      include: { User: true },
    });
  } catch (error) {
    return null;
  }
}
