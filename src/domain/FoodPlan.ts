import { z } from 'zod';

const FoodPlanSchema = z.object({
  id: z.string(),
  date: z.string(),
  patientId: z.string(),
  type: z.string(),
  title: z.string(),
  foodPlans: z.any().array(),
});
type FoodPlanType = z.infer<typeof FoodPlanSchema>;
export class FoodPlan {
  constructor(
    readonly id: string,
    readonly date: string,
    readonly patientId: string,
    readonly type: string,
    readonly title: string,
    readonly foodPlans: any[]
  ) {
    this.id = id;
    this.date = date;
    this.patientId = patientId;
    this.type = type;
    this.title = title;
    this.foodPlans = foodPlans;
  }
  static createMany(data: any[]) {
    const foodPlans: FoodPlan[] = [];
    for (let f of data) {
      const foodPlan = new FoodPlan(
        f.id,
        f.date,
        f.patientId,
        f.type,
        f.title,
        f.foodPlans
      );
      foodPlans.push(foodPlan);
    }
    return foodPlans;
  }
}
