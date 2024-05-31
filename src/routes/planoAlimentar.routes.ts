import { Router, Request, Response } from 'express';
import { Token } from '../class/Token';
import { PlanoAlimentarController } from '../controllers/planoAlimentar.controller';

export const planoAlimentarRoutes = Router();
const planoAlimentarController = new PlanoAlimentarController();
planoAlimentarRoutes.use((req: Request, res: Response, next) => {
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
planoAlimentarRoutes.get('/:patientId', planoAlimentarController.list);
