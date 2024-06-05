import { Nutricionista } from '../domain/Nutricionista';
import { Patient } from '../domain/Patient';
import { PatientDatabase } from '../interfaces/PatientDatabase';
import { prisma } from './prisma';

export class PatientServices implements PatientDatabase {
  async LoginWithCode(cpf: string, codeApp: string): Promise<any> {
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
  async LoginWithPassword(cpf: string, password: string): Promise<any> {
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
  async alterPassword(patientId: string, password: string): Promise<boolean> {
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
  async getNutri(id: string): Promise<null | Nutricionista> {
    try {
      const data = await prisma.patient.findFirst({
        where: { id },
        include: { User: true },
      });
      if (!data?.User) return null;
      return new Nutricionista({
        email: data?.User.email,
        name: data.User.name,
        phone: data.User.phoneNumber,
        cpfOrCnpj: data.User.cpfOrCnpj ?? '',
        crn: data.User.crn ?? '',
        crnCode: data.User.crnCode ?? '',
        fullAdrees: data.User.fullAdrees ?? '',
      });
    } catch (error) {
      return null;
    }
  }
  async getPatient(id: string): Promise<null | Patient> {
    try {
      const data: any = await prisma.patient.findFirst({
        where: { id },
      });
      if (!data) return null;
      return Patient.create(data);
    } catch (error) {
      return null;
    }
  }
}
