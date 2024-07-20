import { NotificationApp } from '../domain/NotificationApp';
import { Nutricionista } from '../domain/Nutricionista';
import { Patient } from '../domain/Patient';
import { PatientDatabase } from '../interfaces/PatientDatabase';
import { prisma } from './prisma';

export class PatientServices implements PatientDatabase {
  async LoginWithCode(cpf: string, codeApp: string): Promise<Patient | null> {
    try {
      const patient = await prisma.patient.findFirst({
        where: {
          cpf,
          codeApp,
        },
      });
      if (!patient) return null;
      return new Patient({
        name: patient?.name,
        age: patient?.age,
        cpf: patient?.cpf,
        biologicalSex: patient.biologicalSex ?? 'Feminino',
        birthday: patient?.birthday,
        bodyMassIndex: patient?.bodyMassIndex,
        email: patient?.email,
        height: patient?.height,
        isPregnant: patient?.isPregnant ?? false,
        notificationToken: patient?.notificationToken,
        phone: patient?.phone,
        weight: patient?.weight,
        weeksPregnant: patient?.weeksPregnant ?? 0,
        weightBeforePregnancy: patient?.weightBeforePregnancy ?? 0,
        id: patient.id,
      });
    } catch (error) {
      return null;
    }
  }
  async LoginWithPassword(
    cpf: string,
    password: string
  ): Promise<Patient | null> {
    try {
      const patient = await prisma.patient.findFirst({
        where: {
          cpf,
          password,
        },
      });
      if (!patient) return null;
      return new Patient({
        name: patient?.name,
        age: patient?.age,
        cpf: patient?.cpf,
        biologicalSex: patient.biologicalSex ?? 'Feminino',
        birthday: patient?.birthday,
        bodyMassIndex: patient?.bodyMassIndex,
        email: patient?.email,
        height: patient?.height,
        isPregnant: patient?.isPregnant ?? false,
        notificationToken: patient?.notificationToken,
        phone: patient?.phone,
        weight: patient?.weight,
        weeksPregnant: patient?.weeksPregnant ?? 0,
        weightBeforePregnancy: patient?.weightBeforePregnancy ?? 0,
        id: patient.id,
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
  async findAllNotifications(): Promise<NotificationApp[] | null> {
    try {
      const notifications = await prisma.patient.findMany({
        where: {
          notification: { some: {} },
          notificationToken: {
            not: '',
          },
        },
        select: {
          notificationToken: true,
          notification: true,
        },
      });
      const notificationsApp: NotificationApp[] = [];
      notifications.map((data) => {
        data.notification.map((n) => {
          notificationsApp.push(
            new NotificationApp(
              data.notificationToken,
              n.title,
              n.body,
              n.period
            )
          );
        });
      });
      return notificationsApp;
    } catch (error) {
      return null;
    }
  }
  async updateNotificationToken(
    patientId: string,
    token: string
  ): Promise<boolean> {
    try {
      const updated = await prisma.patient.update({
        where: {
          id: patientId,
        },
        data: { notificationToken: token },
      });
      return !!updated;
    } catch (error) {
      return false;
    }
  }
}
