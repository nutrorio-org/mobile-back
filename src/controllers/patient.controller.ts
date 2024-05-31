import { Token } from '../class/Token';
import {
  NutriInfo,
  alterPasswordSchema,
  patientResponse,
} from '../schema/patient.schema';
import { alterPassword } from '../services/patient/alterPassword';
import { getNutri } from '../services/patient/getNutri';
import { getPatient } from '../services/patient/getPatient';
import { Request, Response } from 'express';
//cpf 2272788287287
// code jxJG8N
export class PatientController {
  async get(req: Request, res: Response) {
    try {
      const token = req.headers['authorization'];

      const credentials = Token.validate(token ?? '');
      const patient = await getPatient(credentials.id);
      const response = patientResponse.parse(patient);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).send({ message: 'Erro ao buscar os dados do usuario' });
    }
  }
  async getNutricionista(req: Request, res: Response) {
    try {
      const nutri = await getNutri(req.params.id);

      if (nutri) {
        const {
          cpfOrCnpj,
          crn,
          email,
          name,
          crnCode,
          phoneNumber,
          fullAdrees,
        } = nutri.User;
        const response: NutriInfo = {
          cpfOrCnpj: cpfOrCnpj ?? '',
          crn: crn ?? '',
          crnCode: crnCode ?? '',
          email,
          name,
          phone: phoneNumber,
          fullAdrees: fullAdrees ?? '',
        };
        return res.status(200).json(response);
      }
      return res
        .status(500)
        .send({ message: 'Erro ao buscar os dados do usuario' });
    } catch (error) {
      res.status(500).send({ message: 'Erro ao buscar os dados do usuario' });
    }
  }
  async updatePassword(req: Request, res: Response) {
    try {
      const { password } = alterPasswordSchema.parse(req.body);
      const result = await alterPassword(req.params.patientId, password);
      if (!result)
        return res
          .status(400)
          .send({ message: 'Erro ao atualizar sua senhas' });
      res
        .status(200)
        .send({ message: 'Sua senha foi atualizada com sucesso!' });
    } catch (error) {
      return res.status(500).send({ message: 'Erro no servidor' });
    }
  }
}
