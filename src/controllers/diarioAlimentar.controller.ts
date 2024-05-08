import { Request, Response } from 'express';

import { Diario, diarioSchema } from '../schema/diario.schema';
import { createDiarioAlimentar } from '../services/diarioAlimentar/createDiario';
import { getDiariosAlimentares } from '../services/diarioAlimentar/getDiarios';
import { updateDiarioAlimentar } from '../services/diarioAlimentar/updateDiario';

export class DiarioAlimentarController {
  async create(req: Request, res: Response) {
    try {
      const diario: Diario = diarioSchema.parse(req.body);
      const result = await createDiarioAlimentar(diario, req.params.id);
      if (!result)
        res.status(500).send({ message: 'Erro interno ao criar diario!' });

      res.status(201).json(result);
    } catch (error) {
      res.status(400).send({ message: 'Erro ao criar diario alimentar' });
    }
  }
  async get(req: Request, res: Response) {
    try {
      const result = await getDiariosAlimentares(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send({ message: 'Erro ao buscar diarios alimentares' });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const diario: Diario = diarioSchema.parse(req.body);
      const result = await updateDiarioAlimentar(diario, req.params.id);
      if (!result)
        res.status(500).send({ message: 'Erro interno ao buscar diario!' });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send({ message: 'Erro ao buscar diario' });
    }
  }
}
