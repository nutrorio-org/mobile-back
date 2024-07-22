import { Patient } from '../domain/Patient';

export function CreatePatient() {
  return new Patient({
    age: 20,
    biologicalSex: 'Feminino',
    birthday: '01/01/2000',
    bodyMassIndex: 1,
    cpf: '84839511004',
    email: 'test@gmail.com',
    height: 100,
    isPregnant: false,
    name: 'Test',
    phone: '51986861089',
    weight: 70,
    id: '123456',
    notificationToken: '',
  });
}
