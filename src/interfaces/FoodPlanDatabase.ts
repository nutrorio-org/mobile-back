export interface FoodPlanDatabase {
  list(patientId: string): Promise<any[]>;
}
