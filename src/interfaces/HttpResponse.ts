export interface HttpResponse {
  send(res: any, statusCode: number, message: any): void;
}
