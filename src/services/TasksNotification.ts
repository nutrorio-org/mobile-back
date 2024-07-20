import cron from 'node-cron';
import moment from 'moment-timezone';
import { NotificationService } from './NotificationService';
import { PatientServices } from './PatientServices';

// Configuração do fuso horário de Brasília

export async function TasksNotification() {
  const timezone = 'America/Sao_Paulo';

  const patientServices = new PatientServices();
  const notifications = await patientServices.findAllNotifications();
  if (!notifications) return;
  cron.schedule(
    '0 10 * * *',
    () => {
      console.log(
        'Executando tarefa diária às 10h da manhã (Horário de Brasília)'
      );
      NotificationService.sendNotifications(notifications, 'Diario');
    },
    {
      scheduled: true,
      timezone: timezone,
    }
  );

  // Agendamento semanal às segundas-feiras às 10h da manhã no horário de Brasília
  cron.schedule(
    '0 10 * * 1',
    () => {
      console.log(
        'Executando tarefa semanal às 10h da manhã de segunda-feira (Horário de Brasília)'
      );
      NotificationService.sendNotifications(notifications, 'Semanal');
    },
    {
      scheduled: true,
      timezone: timezone,
    }
  );

  // Agendamento mensal na primeira segunda-feira do mês às 10h da manhã no horário de Brasília
  cron.schedule(
    '0 10 1-7 * 1',
    () => {
      const currentDate = moment().tz(timezone);
      if (currentDate.date() <= 7 && currentDate.day() === 1) {
        console.log(
          'Executando tarefa mensal na primeira segunda-feira do mês às 10h da manhã (Horário de Brasília)'
        );
        NotificationService.sendNotifications(notifications, 'Mensal');
      }
    },
    {
      scheduled: true,
      timezone: timezone,
    }
  );
}
// Agendamento diário às 10h da manhã no horário de Brasília
