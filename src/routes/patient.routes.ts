import { Router, Request, Response } from 'express';
import { Token } from '../class/Token';
import { PatientController } from '../controllers/patient.controller';

export const patientRoutes = Router();
const patientController = new PatientController();
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
patientRoutes.get('/', patientController.get);

patientRoutes.get('/nutri/:id', patientController.getNutricionista);

//app.use('/api/protegida', protectedRouter);
