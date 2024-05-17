import { Request, Response } from 'express';

import {
  Diario,
  UpdateDiario,
  diarioSchema,
  updateDiarioSchema,
} from '../schema/diario.schema';
import { createDiarioAlimentar } from '../services/diarioAlimentar/createDiario';
import { getDiariosAlimentares } from '../services/diarioAlimentar/getDiarios';
import { updateDiarioAlimentar } from '../services/diarioAlimentar/updateDiario';
import { deleteDiarioAlimentar } from '../services/diarioAlimentar/deleteDiario';

export class DiarioAlimentarController {
  async create(req: Request, res: Response) {
    try {
      const diario: Diario = diarioSchema.parse(req.body);
      const result = await createDiarioAlimentar(diario, req.params.id);
      if (!result)
        return res
          .status(500)
          .send({ message: 'Erro interno ao criar diario!' });

      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: 'error' });
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
      const diario: UpdateDiario = updateDiarioSchema.parse(req.body);
      const result = await updateDiarioAlimentar(diario, req.body.id);
      if (!result)
        res.status(500).send({ message: 'Erro interno ao atualizar diario!' });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: 'Erro ao atualizar diario' });
    }
  }
  async del(req: Request, res: Response) {
    try {
      const result = await deleteDiarioAlimentar(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).send({ message: 'Erro ao remover diarios alimentares' });
    }
  }
}
