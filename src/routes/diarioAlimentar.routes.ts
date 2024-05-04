import { Router, Request, Response } from 'express';
import { Token } from '../class/Token';
import { DiarioAlimentarController } from '../controllers/diarioAlimentar.controller';
import { ExpressServer } from '../server';

export const diarioAlimentarRoutes = Router();
const diarioController = new DiarioAlimentarController();
diarioAlimentarRoutes.use((req: Request, res: Response, next) => {
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
const server = new ExpressServer();
diarioAlimentarRoutes.post(
  '/',
  // server.upload.single('foto'),
  diarioController.upload
);