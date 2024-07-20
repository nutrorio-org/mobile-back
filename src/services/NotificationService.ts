import axios from 'axios';
import { NotificationApp } from '../domain/NotificationApp';

// const cron = require('node-cron');
// const fetch = require('node-fetch');

// Função para enviar notificações
type FilterType = 'Diario' | 'Mensal' | 'Semanal';

export class NotificationService {
  static async sendNotifications(
    notifications: NotificationApp[],
    filterType: FilterType
  ) {
    try {
      const notifications_ = filter(filterType, notifications);
      notifications_.forEach(async (notification) => {
        const message = {
          // to: notification.token,
          to: 'ExponentPushToken[WIa-jzAGj6SjAJc-0dRyOz]',
          sound: 'default',
          title: notification.title,
          body: notification.body,
          data: { extraData: '' },
        };
        //Content-Type: application/json
        //https://exp.host/--/api/v2/push/send"
        const response = await axios.post(
          'https://exp.host/--/api/v2/push/send',
          message,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.status === 200) {
          console.log(
            `Notification sent successfully to ${notification.token}`
          );
        } else {
          console.log(`Failed to send notification to ${notification.token}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
function filter(
  filterType: FilterType,
  notifications: NotificationApp[]
): NotificationApp[] {
  const notifications_ = notifications.filter((n) => n.period == filterType);
  return notifications_;
}
// Agendar a tarefa para rodar a cada 2 horas
// cron.schedule('0 */2 * * *', () => {
//   console.log('Sending notifications...');
//   sendNotifications();
// });
