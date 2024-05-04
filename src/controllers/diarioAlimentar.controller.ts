import { Request, Response } from 'express';

import { uploadImage } from '../services/firebase/uploadImage';

export class DiarioAlimentarController {
  async upload(req: Request, res: Response) {
    console.log('@');
    console.log(req.body, req.file);
    try {
      if (!req.body.foto) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
      }
      const url = await uploadImage(req.body.foto);
      res.status(200).json(url);
    } catch (error) {
      res.status(500).send({ message: 'Erro ao salvar imagem no firebase' });
    }
  }
}
