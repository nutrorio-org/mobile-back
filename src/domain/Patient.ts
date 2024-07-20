import { z } from 'zod';

// Definição do schema usando Zod
const PatientSchema = z.object({
  id: z.string(),
  cpf: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  birthday: z.string(),
  weight: z.number(),
  height: z.number(),
  age: z.number(),
  bodyMassIndex: z.number(),
  biologicalSex: z.string(),
  isPregnant: z.boolean().default(false),
  weeksPregnant: z.number().optional(),
  weightBeforePregnancy: z.number().optional(),
  notificationToken: z.string(),
});
type PatientType = z.infer<typeof PatientSchema>;

// Definição da classe Patient
export class Patient {
  id: string;
  cpf: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  weight: number;
  height: number;
  age: number;
  bodyMassIndex: number;
  biologicalSex: string;
  notificationToken: string;

  isPregnant: boolean;
  weeksPregnant?: number;
  weightBeforePregnancy?: number;

  // Construtor
  constructor(patient: PatientType) {
    this.id = patient.id;
    this.cpf = patient.cpf;
    this.name = patient.name;
    this.email = patient.email;
    this.phone = patient.phone;
    this.birthday = patient.birthday;
    this.weight = patient.weight;
    this.height = patient.height;
    this.age = patient.age;
    this.bodyMassIndex = patient.bodyMassIndex;
    this.biologicalSex = patient.biologicalSex;
    this.isPregnant = patient.isPregnant;
    this.weeksPregnant = patient.weeksPregnant;
    this.weightBeforePregnancy = patient.weightBeforePregnancy;
    this.notificationToken = patient.notificationToken;
  }

  // Método estático para criar uma instância da classe Patient
  static create(patient: PatientType): Patient | null {
    // Validação usando Zod
    const parsedPatient = PatientSchema.safeParse(patient);
    if (parsedPatient.success) return new Patient(parsedPatient.data);
    return null;
  }
}
