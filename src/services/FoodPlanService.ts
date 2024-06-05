import { FoodPlanDatabase } from '../interfaces/FoodPlanDatabase';
import { prisma } from './prisma';

export class FoodPlanService implements FoodPlanDatabase {
  async list(patientId: string): Promise<any[]> {
    try {
      return await prisma.foodPlan.findMany({
        where: {
          patientId,
        },
      });
    } catch (error) {
      return [];
    }
  }
}
