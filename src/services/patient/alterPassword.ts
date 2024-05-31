import { prisma } from '../prisma';

export async function alterPassword(patientId: string, password: string) {
  try {
    const result = await prisma.patient.update({
      where: {
        id: patientId,
      },
      data: { password },
    });
    if (!result) return false;
    return true;
  } catch (error) {
    return false;
  }
}
