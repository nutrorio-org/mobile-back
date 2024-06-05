import { FoodPlan } from '../domain/FoodPlan';
import { FoodPlanService } from '../services/FoodPlanService';

export class FoodPlanOrder {
  constructor(readonly foodPlanService: FoodPlanService) {
    this.foodPlanService = foodPlanService;
  }
  async list(patientId: string) {
    const foodPlans = await this.foodPlanService.list(patientId);
    if (!foodPlans) return [];
    return FoodPlan.createMany(foodPlans);
  }
}
