import { z } from 'zod';
import { Crypto } from '../class/Crypto';
import { PatientDatabase } from '../interfaces/PatientDatabase';
import { Token } from '../class/Token';

export class PatientCredentials {
  constructor(readonly patientDatabase: PatientDatabase) {
    this.patientDatabase = patientDatabase;
  }
  async updatePassword(password: string, patientId: string) {
    const passwordEncrypted = await this.validatePassword(password);
    if (passwordEncrypted) {
      return await this.patientDatabase.alterPassword(patientId, password);
    }
    return false;
  }
  // private async encryptPassword(password: string) {
  //   const isValidPassword = await this.validatePassword(password);
  //   if (isValidPassword) return await Crypto.generateHash(password);
  //   else return false;
  // }
  private async validatePassword(password: string) {
    const validateSchema = z.string().min(8, { message: 'min 8 caracteres' });
    const result = validateSchema.safeParse(password);
    if (result.success) return true;
    return false;
  }
  async login(password: string, cpf: string) {
    if (password.length == 6) {
      const result = await this.patientDatabase.LoginWithCode(cpf, password);
      if (!result) return null;
      const token = Token.generate(result.cpf, result.id);
      return { token };
    } else {
      const result = await this.patientDatabase.LoginWithPassword(
        cpf,
        password
      );
      if (!result) return null;
      const token = Token.generate(result.cpf, result.id);
      return { token };
    }
  }
}
