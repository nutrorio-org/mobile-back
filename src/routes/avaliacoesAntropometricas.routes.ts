import { Router, Request, Response } from 'express';
import { Token } from '../class/Token';
import { AvaliacaoAntropometricaController } from '../controllers/avaliacao.controller';

export const avaliacaoAntropometricaRoutes = Router();
const avaliacaoController = new AvaliacaoAntropometricaController();
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
avaliacaoAntropometricaRoutes.get('/:patientId', avaliacaoController.list);
avaliacaoAntropometricaRoutes.get('/find/:id', avaliacaoController.findById);
