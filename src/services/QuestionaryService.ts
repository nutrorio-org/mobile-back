import { Question } from '../domain/Question';
import { QuestionPending } from '../domain/QuestionPending';
import { QuestionsDescription } from '../domain/QuestionsDescription';
import { Schedule } from '../domain/Schedule';
import { QuestionaryDatabase } from '../interfaces/QuestionaryDatabase';
import { prisma } from './prisma';

export class QuestionaryServices implements QuestionaryDatabase {
  async list(patientId: string) {
    try {
      return await prisma.answers.findMany({
        where: {
          patientId,
        },
      });
    } catch (error) {
      return [];
    }
  }
  async find(id: string) {
    try {
      return await prisma.answers.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      return null;
    }
  }
  async getQuestiosPendents(patientId: string) {
    try {
      const questionarioPendente = await prisma.questionarioPendente.findMany({
        where: {
          patientId,
        },
      });

      const questionarioPromises = questionarioPendente.map(async (q) => {
        const res = await prisma.questionary.findFirst({
          where: {
            id: q.questionarioId,
          },
        });
        if (res) {
          return {
            ...q,
            title: res.title,
          };
        }
        return null;
      });

      // Aguarda todas as promessas serem resolvidas e filtra os valores nulos
      const questionario = (await Promise.all(questionarioPromises)).filter(
        Boolean
      );

      return questionario;
    } catch (error) {
      return [];
    }
  }
}
