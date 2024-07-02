export default class ExamGraphic {
  constructor(
    readonly data: string,
    // readonly peso: number,
    readonly massaGordaKg: number,
    readonly massaMagraKg: number
  ) {
    this.data = this.formatDate(data);
  }
  private formatDate(dateString: string) {
    // const date = new Date(dateString);
    // const day = String(date.getDate()).padStart(2, '0');
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // const year = date.getFullYear();

    // return `${day}/${month}/${year}`;
    const dateParts = dateString.split('T')[0].split('-')
	const year = dateParts[0]
	const month = dateParts[1]
	const day = dateParts[2]

	return `${day}/${month}/${year}`
  }
}
