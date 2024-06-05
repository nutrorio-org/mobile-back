import { PatientCredentials } from '../../application/PatientCredentials';
import { PatientInformation } from '../../application/PatientInformation';
import { Nutricionista } from '../../domain/Nutricionista';
import { Patient } from '../../domain/Patient';
import { PatientServices } from '../../services/PatientServices';
const patientServices = new PatientServices();

const patientInformation = new PatientInformation(patientServices);
const patientCredentials = new PatientCredentials(patientServices);
const patientId = '662fb579e6bc5c89ea59fa19';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcGYiOiI4NDgzOTUxMTAwNCIsImlkIjoiNjYyZmI1NzllNmJjNWM4OWVhNTlmYTE5IiwiaWF0IjoxNzE0NDMzODU4fQ.q8eosNnWFv5AxYZ7BNYzlTq61-tpkOTfo1A6oES-cpM';
test.skip('Deve buscar um paciente pelo id', async () => {
  //EL9yLi senha do paciente
  //84839511004
  const result = await patientInformation.get(token);
  expect(result?.id).toBe(patientId);
  expect(result).toBeInstanceOf(Patient);
});

test.skip('Deve buscar os dados do nutricionista pelo id do paciente', async () => {
  const result = await patientInformation.getNutricionista(patientId);
  expect(result).toBeInstanceOf(Nutricionista);
});
test.skip('Deve atualizar a senha do paciente', async () => {
  const password = 'test123456';
  const result = await patientCredentials.updatePassword(password, patientId);
  expect(result).toBeTruthy();
});
test.skip('Deve fazer login', async () => {
  //EL9yLi senha do paciente
  //84839511004
  const input = {
    password: 'EL9yLi',
    cpf: '84839511004',
  };
  const result = await patientCredentials.login(input.password, input.cpf);
  expect(result?.token).toBeDefined();
});
