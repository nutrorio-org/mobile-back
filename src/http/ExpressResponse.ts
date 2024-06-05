import { HttpResponse } from '../interfaces/HttpResponse';
import { Response } from 'express';
export class ExpressResponse implements HttpResponse {
  send(res: Response, statusCode: number, message: any): void {
    res.status(statusCode).send(message);
  }
}
