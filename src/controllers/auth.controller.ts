import { Token } from '../class/Token';
import { LoginPatient } from '../schema/auth.schema';
import { LoginWithCode, LoginWithPassword } from '../services/Login';
import { Request, Response } from 'express';

export class AuthController {
  async login(req: Request, res: Response) {
    console.log(req.body);
    try {
      const data = LoginPatient.parse(req.body);
      const { cpf, password } = data;
      const t = new Token();
      if (data.password.length == 6) {
        const result = await LoginWithCode(cpf, password);
        if (!result)
          return res.status(400).send({ message: 'CPF ou Senha incorretos!' });
        const token = t.generate(result.cpf, result.id);
        return res.status(200).send({ token });
      } else {
        const result = await LoginWithPassword(cpf, password);
        if (!result)
          return res.status(400).send({ message: 'CPF ou Senha incorretos!' });
        const token = t.generate(result.cpf, result.id);
        return res.status(200).send({ token });
      }
    } catch (error) {
      return res.status(500).send({ message: 'Erro no servidor' });
    }
  }
}
