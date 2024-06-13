import { AnthropometricExaminationOrder } from '../../application/AnthropometricExaminationOrder';
import { AnthropometricExam } from '../../domain/AnthropometricExam';
import { CreatePatient } from '../../factory/CratePatient';
import { AnthropometricExamFakeService } from '../../services/repository/AnthropometricExamFakeService';
const anthropometricExamService = new AnthropometricExamFakeService();
const anthropometricExamOrder = new AnthropometricExaminationOrder(
  anthropometricExamService
);
const patient = CreatePatient();
test.skip('deve buscar uma lista de informaçoes de exames', async () => {
  const exames = await anthropometricExamOrder.list(patient.id);
  expect(exames[0].id).toEqual('qwertyuiop');
  expect(exames[0].date).toEqual(new Date('2024-05-21T13:43:01.996Z'));
  expect(exames[0].title).toEqual('test');
});
test.skip('deve buscar uma exame pelo seu id', async () => {
  const exame: AnthropometricExam =
    await anthropometricExamOrder.findById('qwertyuiop');
  expect(exame.id).toEqual('qwertyuiop');
  expect(exame.date).toEqual(new Date('2024-05-21T13:43:01.996Z'));
  expect(exame.title).toEqual('test');
});
