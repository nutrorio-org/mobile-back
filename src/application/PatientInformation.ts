import { Token } from '../class/Token';
import { Nutricionista } from '../domain/Nutricionista';
import { Patient } from '../domain/Patient';
import { PatientDatabase } from '../interfaces/PatientDatabase';

export class PatientInformation {
  constructor(readonly patientDatabase: PatientDatabase) {
    this.patientDatabase = patientDatabase;
  }
  async get(token: string) {
    const credentials = Token.validate(token ?? '');
    const patient: any = await this.patientDatabase.getPatient(credentials.id);
    return Patient.create(patient);
  }

  async getNutricionista(id: string): Promise<Nutricionista | null> {
    const data: any = await this.patientDatabase.getNutri(id);
    return Nutricionista.create(data);
  }
}
