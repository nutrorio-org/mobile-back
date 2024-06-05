export class AnthropometricExam {
  constructor(
    readonly id: string,
    readonly date: Date,
    readonly title: string
  ) {
    this.id = id;
    this.date = date;
    this.title = title;
  }
}
