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
  const patient = await patientInformation.get(
    req.headers['authorization'] ?? ''
  );
  if (!patient)
    return expressResponse.send(res, 400, PatientError.PatientNotFound);
  const nutricionista = await patientInformation.getNutricionista(patient.id);
  res.send({ ...patient, nutricionista: { ...nutricionista } });
});

patientRoutes.put(
  '/password/:patientId',
  async (req: Request, res: Response) => {
    const response = await patientCredentials.updatePassword(
      req.body.password,
      req.params.patientId
    );
    if (!response)
      return expressResponse.send(res, 400, PatientError.FailedPasswordUpdate);

    res.send(response);
  }
);
patientRoutes.put('/notificationApp', async (req: Request, res: Response) => {
  try {
    const response = await patientServices.updateNotificationToken(
      req.body.patientId,
      req.body.token
    );
    if (!response)
      return expressResponse.send(
        res,
        400,
        PatientError.FailedInUpdateAppToken
      );

    res.send(response);
  } catch (error) {
    return expressResponse.send(res, 500, PatientError.FailedInUpdateAppToken);
  }
});
