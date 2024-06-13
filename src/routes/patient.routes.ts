import { Router, Request, Response } from 'express';
import { Token } from '../class/Token';
import { PatientInformation } from '../application/PatientInformation';
import { PatientCredentials } from '../application/PatientCredentials';
import { PatientInput } from '../http/validations/PatientInputs';
import { ExpressResponse } from '../http/ExpressResponse';
import { PatientError } from '../errors/patient.errors';
import { PatientServices } from '../services/PatientServices';

export const patientRoutes = Router();
const patientServices = new PatientServices();
const patientInformation = new PatientInformation(patientServices);
const patientCredentials = new PatientCredentials(patientServices);
const patientInput = new PatientInput();
const expressResponse = new ExpressResponse();

patientRoutes.use((req: Request, res: Response, next) => {
  // Extraindo o token do cabeçalho da requisição
  const token = req.headers['authorization'];
  // Verificando se o token foi fornecido
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    Token.validate(token);
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
});
patientRoutes.get('/', async (req: Request, res: Response) => {
  const response = await patientInformation.get(
    req.headers['authorization'] ?? ''
  );
  if (!response)
    return expressResponse.send(res, 400, PatientError.PatientNotFound);
  res.send(response);
});

patientRoutes.get('/nutri/:id', async (req: Request, res: Response) => {
  const id = patientInput.ID(req.params.id);
  if (!id) return expressResponse.send(res, 400, PatientError.InvalidID);

  const response = await patientInformation.getNutricionista(id);
  if (!response)
    return expressResponse.send(res, 400, PatientError.NutriNotFound);
  res.send(response);
});
patientRoutes.put(
  '/password/:patientId',
  async (req: Request, res: Response) => {
    console.log(req.body, req.params);

    const response = await patientCredentials.updatePassword(
      req.body.password,
      req.params.patientId
    );
    if (!response)
      return expressResponse.send(res, 400, PatientError.FailedPasswordUpdate);
    console.log('@');

    res.send(response);
  }
);
