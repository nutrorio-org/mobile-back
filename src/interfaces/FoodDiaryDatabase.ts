import { FoodDiary } from '../domain/FoodDiary';

export interface FoodDiaryDatabase {
  create(data: FoodDiary, patientId: string): Promise<FoodDiary | null>;
  findAll(patientId: string): Promise<FoodDiary[]>;
  update(data: FoodDiary): Promise<any>;
  remove(id: string): Promise<any>;
}
