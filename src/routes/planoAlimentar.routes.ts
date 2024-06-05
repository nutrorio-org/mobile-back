import { Router, Request, Response } from 'express';
import { Token } from '../class/Token';
import { FoodPlanOrder } from '../application/FoodPlanOrder';
import { FoodPlanService } from '../services/FoodPlanService';

export const planoAlimentarRoutes = Router();
const foodPlanService = new FoodPlanService();
const foodPlanOrder = new FoodPlanOrder(foodPlanService);
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
planoAlimentarRoutes.get('/:patientId', async (req, res) => {
  const foodPlans = await foodPlanOrder.list(req.params.patientId);
  res.send(foodPlans);
});
