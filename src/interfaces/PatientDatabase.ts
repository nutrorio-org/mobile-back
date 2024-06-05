import { Nutricionista } from '../domain/Nutricionista';
import { Patient } from '../domain/Patient';

export interface PatientDatabase {
  alterPassword(patientId: string, password: string): Promise<boolean>;
  getNutri(id: string): Promise<null | Nutricionista>;
  getPatient(id: string): Promise<null | Patient>;
  LoginWithCode(cpf: string, codeApp: string): Promise<any>;
  LoginWithPassword(cpf: string, password: string): Promise<any>;
}
