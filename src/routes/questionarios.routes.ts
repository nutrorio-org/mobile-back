import { Router, Request, Response } from 'express';
import { Token } from '../class/Token';
import { QuestionarioController } from '../controllers/questionario.controller';

export const questionariosRoutes = Router();
const questionariosController = new QuestionarioController();
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
questionariosRoutes.get('/:patientId', questionariosController.list);
questionariosRoutes.get('/find/:id', questionariosController.find);
questionariosRoutes.get(
  '/pending/:patientId',
  questionariosController.getQuestionsPendents
);
