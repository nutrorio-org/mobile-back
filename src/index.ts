// const cron = require('node-cron');
import cron from 'node-cron';
import { authRoutes } from './routes/auth.routes';
import { routes as avaliacaoAntropometricaRoutes } from './routes/avaliacoesAntropometricas.routes';
import { diarioAlimentarRoutes } from './routes/diarioAlimentar.routes';
import { patientRoutes } from './routes/patient.routes';
import { planoAlimentarRoutes } from './routes/planoAlimentar.routes';
import { questionariosRoutes } from './routes/questionarios.routes';
import { scheduleRoutes } from './routes/schedule.routes';
import { ExpressServer } from './server';
import { NotificationService } from './services/NotificationService';
import { PatientServices } from './services/PatientServices';
import { TasksNotification } from './services/TasksNotification';
const server = new ExpressServer();
server.addRouter(authRoutes);
server.use('/api/patient', patientRoutes);
server.use('/api/schedule', scheduleRoutes);
server.use('/api/diarioAlimentar', diarioAlimentarRoutes);
server.use('/api/avaliacao', avaliacaoAntropometricaRoutes);
server.use('/api/questionario', questionariosRoutes);
server.use('/api/planoAlimentar', planoAlimentarRoutes);

server.listen();
TasksNotification();
// cron.schedule('*/5 * * * *', async () => {
//   const patientServices = new PatientServices();
//   console.log('Sending notifications...');
//   const notifications = await patientServices.findAllNotifications();
//   if (!notifications) return;
//   NotificationService.sendNotifications(notifications, 'Diario');
// });
