import { prisma } from '../prisma';

export async function getPatient(id: string) {
  try {
    return await prisma.patient.findFirst({
      where: { id },
    });
  } catch (error) {
    return null;
  }
}
