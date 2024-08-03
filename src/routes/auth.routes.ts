import { Router } from 'express';
import { PatientServices } from '../services/PatientServices';
import { PatientCredentials } from '../application/PatientCredentials';
import { PatientInput } from '../http/validations/PatientInputs';
import { ExpressResponse } from '../http/ExpressResponse';
import { PatientError } from '../errors/patient.errors';
import { NotificationService } from '../services/NotificationService';
import { VersionApp } from '../services/VersionApp';

const patientServices = new PatientServices();
const patientCredentials = new PatientCredentials(patientServices);
const expressResponse = new ExpressResponse();

export const authRoutes = Router();
authRoutes.post('/api/login', async (req, res) => {
  const patientInput = new PatientInput();
  const input = patientInput.Login(req.body);
  if (!input) return expressResponse.send(res, 400, PatientError.InvalidFields);
  const result = await patientCredentials.login(input.password, input.cpf);
  if (!result) return expressResponse.send(res, 400, PatientError.FailedLogin);
  res.send(result);
});
authRoutes.post('/api/test', async (req, res) => {
  const patientServices = new PatientServices();
  const notifications = await patientServices.findAllNotifications();
  await NotificationService.sendNotifications(notifications ?? [], 'Diario');
  res.send('ok');
});

authRoutes.get('/api/version', async (req, res) => {
  const versionApp = new VersionApp();
  const version = await versionApp.getVersion();
  res.send({ version });
});
