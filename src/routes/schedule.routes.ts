import { Router, Request, Response } from 'express';
import { Token } from '../class/Token';
import { ScheduleOrder } from '../application/ScheduleOrder';
import { ScheduleServices } from '../services/ScheduleService';

export const scheduleRoutes = Router();
const scheduleService = new ScheduleServices();
const scheduleOrder = new ScheduleOrder(scheduleService);
scheduleRoutes.use((req: Request, res: Response, next) => {
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
scheduleRoutes.get('/:id', async (req, res) => {
  const schedules = await scheduleOrder.list(req.params.id);
  res.send(schedules);
});
