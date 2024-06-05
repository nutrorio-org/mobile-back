export interface QuestionaryDatabase {
  list(patientId: string): Promise<any>;
  find(id: string): Promise<any>;
  getQuestiosPendents(patientId: string): Promise<any>;
}
