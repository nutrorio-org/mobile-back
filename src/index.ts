import { authRoutes } from './routes/auth.routes';
import { patientRoutes } from './routes/patient.routes';
import { scheduleRoutes } from './routes/schedule.routes';
import { ExpressServer } from './server';
const server = new ExpressServer();
server.addRouter(authRoutes);
server.use('/api/patient', patientRoutes);
server.use('/api/schedule', scheduleRoutes);

server.listen();
