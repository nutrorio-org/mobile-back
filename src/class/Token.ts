import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../enviroments';
export interface PatientToken {
  cpf: string;
  id: string;
}
export class Token {
  static generate(cpf: string, id: string) {
    const token = jwt.sign({ cpf, id }, JWT_SECRET);
    return token;
  }
  static validate(token: string) {
    const decoded: PatientToken = jwt.verify(token, JWT_SECRET) as PatientToken;
    return decoded;
  }
}
