import { ScheduleOrder } from '../../application/ScheduleOrder';
import { ScheduleServices } from '../../services/ScheduleService';
const patientId = '662fb579e6bc5c89ea59fa19';

test('Buscar agendamentos', async () => {
  const scheduleService = new ScheduleServices();
  const scheduleOrder = new ScheduleOrder(scheduleService);
  const schedules = await scheduleOrder.list(patientId);
  expect(schedules.length).toBeGreaterThan(0);
});
