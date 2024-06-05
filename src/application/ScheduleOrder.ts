import { Schedule } from '../domain/Schedule';
import { ScheduleDatabase } from '../interfaces/ScheduleDatabase';

export class ScheduleOrder {
  constructor(readonly scheduleService: ScheduleDatabase) {
    this.scheduleService = scheduleService;
  }
  async list(patientId: string) {
    const data = await this.scheduleService.get(patientId);
    const schedules = Schedule.createMany(data);
    return this.removeInvalidDate(schedules);
  }
  private removeInvalidDate(lista: Schedule[]) {
    const listaFiltrada = lista.filter((item) => this.isValidDate(item.start));
    return listaFiltrada;
  }
  private isValidDate(dataString: string) {
    const dataAtual = new Date();
    const data = new Date(dataString);
    return data > dataAtual;
  }
}
