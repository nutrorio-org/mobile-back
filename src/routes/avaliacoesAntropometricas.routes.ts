import { Router, Request, Response } from 'express';
import { Token } from '../class/Token';

import { AnthropometricExaminationOrder } from '../application/AnthropometricExaminationOrder';
import { AnthropometricExamService } from '../services/AnthropometricExamService';

export const avaliacaoAntropometricaRoutes = Router();
const anthropometricExamService = new AnthropometricExamService();
const anthropometricExamOrder = new AnthropometricExaminationOrder(
  anthropometricExamService
);
avaliacaoAntropometricaRoutes.use((req: Request, res: Response, next) => {
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
avaliacaoAntropometricaRoutes.get('/:patientId', async (req, res) => {
  const result = await anthropometricExamOrder.list(req.params.patientId);
  res.send(result);
});
avaliacaoAntropometricaRoutes.get('/find/:id', async (req, res) => {
  const result = await anthropometricExamOrder.findById(req.params.id);
  res.send(result);
});
