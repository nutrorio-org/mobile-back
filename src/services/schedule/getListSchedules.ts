import { prisma } from '../prisma';

export function getListSchedules(id: string) {
  try {
    return prisma.event.findMany({
      where: {
        patientId: id,
        status: 'Consulta Confirmada',
      },
    });
  } catch (error) {
    return [];
  }
}
