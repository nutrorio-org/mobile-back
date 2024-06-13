import { QuestionaryOrder } from '../../application/QuestionaryOrder';
import { Question } from '../../domain/Question';
import { QuestionaryServices } from '../../services/QuestionaryService';
const patientId = '662fb579e6bc5c89ea59fa19';
const questionaryService = new QuestionaryServices();
const questionarioOrder = new QuestionaryOrder(questionaryService);

test.skip('Deve buscar os questionario concluido pelo seu id', async () => {
  const questionario = await questionarioOrder.getCompleted(
    '664f56519959f0c7d9e7d339'
  );
  expect(questionario).toBeInstanceOf(Question);
});
test.skip('Deve buscar os questionario pendentes', async () => {
  const questionario = await questionarioOrder.getPending(patientId);
  expect(questionario.length).toEqual(0);
});
test.skip('Deve buscar as descriçoes do questionario ', async () => {
  const questionario = await questionarioOrder.getDescriptions(patientId);
  expect(questionario.length).toBeGreaterThan(0);
});
