import { Router, Request, Response } from 'express';
import { Token } from '../class/Token';
import { QuestionaryOrder } from '../application/QuestionaryOrder';
import { QuestionaryServices } from '../services/QuestionaryService';

export const questionariosRoutes = Router();
const questionaryService = new QuestionaryServices();
const questionarioOrder = new QuestionaryOrder(questionaryService);
questionariosRoutes.use((req: Request, res: Response, next) => {
  const token = req.headers['authorization'];
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
questionariosRoutes.get('/:patientId', async (req, res) => {
  const result = await questionarioOrder.getDescriptions(req.params.patientId);
  res.send(result);
});
questionariosRoutes.get('/find/:id', async (req, res) => {
  const result = await questionarioOrder.getCompleted(req.params.id);
  res.send(result);
});
questionariosRoutes.get('/pending/:patientId', async (req, res) => {
  const pendings = await questionarioOrder.getPending(req.params.patientId);
  res.send(pendings);
});
