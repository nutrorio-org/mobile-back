import { FoodDiary } from '../domain/FoodDiary';
import { FoodDiaryService } from '../services/FoodDiaryService';

export class FoodDiaryOrder {
  constructor(readonly foodDiaryService: FoodDiaryService) {
    this.foodDiaryService = foodDiaryService;
  }
  async create(input: InputFoodDiary, id: string) {
    const foodDiary = FoodDiary.create(input);
    return await this.foodDiaryService.create(foodDiary, id);
  }
  async get(id: string) {
    return await this.foodDiaryService.findAll(id);
  }
  async update(input: FoodDiary) {
    return await this.foodDiaryService.update(input);
  }
  async del(id: string) {
    return await this.foodDiaryService.remove(id);
  }
}
type InputFoodDiary = {
  date: string;
  title: string;
  emoji: 'like' | 'heart' | 'hand' | 'none';
  // id?: string | undefined;
  description: string;
  photos?: string[] | undefined;
  comments?: string | undefined;
};
