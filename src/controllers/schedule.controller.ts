import { Token } from '../class/Token';
import { patientResponse } from '../schema/patient.schema';
import { getPatient } from '../services/patient/getPatient';
import { Request, Response } from 'express';
import { getListSchedules } from '../services/schedule/getListSchedules';
import { listSchedules } from '../schema/schedule.schema';
import { removeSchedules } from '../utils/removeSchedule';
//cpf 2272788287287
// code jxJG8N
export class ScheduleController {
  async get(req: Request, res: Response) {
    try {
      const scheduleList = await getListSchedules(req.params.id);
      const formatList = listSchedules.parse(scheduleList);
      const result = removeSchedules(formatList);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({ message: 'Erro ao buscar os agendamentos' });
    }
  }
}
