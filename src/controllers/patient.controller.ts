import { Token } from '../class/Token';
import {
  NutriInfo,
  nutriResponse,
  patientResponse,
} from '../schema/patient.schema';
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
}
