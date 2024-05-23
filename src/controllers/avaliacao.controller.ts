import { Request, Response } from 'express';
import { AvaliacaoAntropometricaService } from '../services/avaliacaoAntropometrica/AvaliacaoAntropometrica.service';
import { listAvaliacaoSchema } from '../schema/avaliacao.schema';
const avaliacaoService = new AvaliacaoAntropometricaService();
export class AvaliacaoAntropometricaController {
  async list(req: Request, res: Response) {
    try {
      const query = await avaliacaoService.list(req.params.patientId);
      const data = listAvaliacaoSchema.parse(query);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: 'error' });
    }
  }
  async findById(req: Request, res: Response) {
    console.log(req.params);

    try {
      const query = await avaliacaoService.findById(req.params.id);
      res.send(query);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: 'error' });
    }
  }
}
