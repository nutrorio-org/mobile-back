import { prisma } from './prisma';

export async function LoginWithCode(cpf: string, codeApp: string) {
  try {
    return await prisma.patient.findFirst({
      where: {
        cpf,
        codeApp,
      },
    });
  } catch (error) {
    return null;
  }
}
export async function LoginWithPassword(cpf: string, password: string) {
  try {
    return await prisma.patient.findFirst({
      where: {
        cpf,
        password,
      },
    });
  } catch (error) {
    return null;
  }
}
