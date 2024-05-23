import { Request, Response } from 'express';
import { QuestionarioService } from '../services/questionario/QuestionarioService';
import {
  questionarySchema,
  titlesQuestionarySchema,
} from '../schema/questionario.schema';
const questionarioService = new QuestionarioService();
export class QuestionarioController {
  async list(req: Request, res: Response) {
    try {
      const result = await questionarioService.list(req.params.patientId);
      const data = titlesQuestionarySchema.parse(result);
      res.send(data);
    } catch (error) {
      res.send('error em questionario');
    }
  }
  async find(req: Request, res: Response) {
    try {
      const result = await questionarioService.find(req.params.id);
      if (!result)
        return res.status(400).send('Não foi encontrado o questionario');
      const data = questionarySchema.parse(result);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.send('error em questionario');
    }
  }
}
