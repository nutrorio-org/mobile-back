import { Router, Request, Response } from 'express';
import { Token } from '../class/Token';

import { FoodDiaryOrder } from '../application/FoodDiaryOrder';
import { FoodDiaryService } from '../services/FoodDiaryService';
import { FoodDiaryInput } from '../http/validations/FoodDiaryInput';

export const diarioAlimentarRoutes = Router();
const foodDiaryService = new FoodDiaryService();
const foodDiaryOrder = new FoodDiaryOrder(foodDiaryService);
const foodDiaryInput = new FoodDiaryInput();
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
diarioAlimentarRoutes.post('/:id', async (req, res) => {
  try {
    const body = foodDiaryInput.Create(req.body);
    if (!body) return res.status(400).send('Parametros invalidos');
    const result = await foodDiaryOrder.create(
      {
        ...body,
        photos: body.photos ?? [],
        emoji: 'none',
      },

      req.params.id
    );
    res.send(result);
  } catch (error) {
    res.status(500).send('Erro interno');
  }
});

diarioAlimentarRoutes.get('/:id', async (req, res) => {
  try {
    const result = await foodDiaryOrder.get(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send('Erro interno');
  }
});
diarioAlimentarRoutes.put('/', async (req, res) => {
  try {
    const result = await foodDiaryOrder.update(req.body);
    res.send(result);
  } catch (error) {
    res.status(500).send('Erro interno');
  }
});
diarioAlimentarRoutes.delete('/:id', async (req, res) => {
  const result = await foodDiaryOrder.del(req.params.id);
  if (!result) return res.status(400).send('Erro ao deletar diario alimentar');
  res.send(result);
});
