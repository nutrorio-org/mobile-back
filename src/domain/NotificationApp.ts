export class NotificationApp {
  constructor(
    readonly token: string,
    readonly title: string,
    readonly body: string,
    readonly period: string
  ) {
    this.body = body;
    this.title = title;
    this.token = token;
    this.period = period;
  }
}
