import { FoodDiary } from '../domain/FoodDiary';
import { FoodDiaryDatabase } from '../interfaces/FoodDiaryDatabase';
import { prisma } from './prisma';

export class FoodDiaryService implements FoodDiaryDatabase {
  async create(data: FoodDiary, patientId: string): Promise<FoodDiary> {
    try {
      const result = await prisma.diarioAlimentar.create({
        data: {
          date: data.date,
          description: data.description ?? '',
          title: data.title,
          comments: data.comments ?? '',
          emoji: data.emoji ?? 'none',
          photos: data.photos ?? [],
          patientId,
        },
      });
      data.setId(result.id);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao criar diario alimentar');
      //return null;
    }
  }
  async findAll(patientId: string): Promise<FoodDiary[]> {
    try {
      const result = await prisma.diarioAlimentar.findMany({
        where: {
          patientId,
        },
      });
      return result.map((diary) => {
        return new FoodDiary(
          diary.id,
          diary.date,
          diary.title,
          diary.description,
          diary.photos,
          diary.comments ?? '',
          diary.emoji ?? 'none'
        );
      });
    } catch (error) {
      return [];
    }
  }
  async update(data: FoodDiary): Promise<any> {
    try {
      const { date, description, id, title, photos } = data;
      return await prisma.diarioAlimentar.update({
        where: {
          id,
        },
        data: {
          description,
          date,
          title,
          photos,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao atualizar diario');
    }
  }
  async remove(id: string): Promise<any> {
    try {
      return await prisma.diarioAlimentar.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return null;
    }
  }
}
