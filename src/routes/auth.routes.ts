import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export const authRoutes = Router();
const authController = new AuthController();
authRoutes.post('/api/login', authController.login);
