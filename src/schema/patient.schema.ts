import { z } from 'zod';

export const patientResponse = z.object({
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
  biologicalSex: z.enum(['Feminino', 'Masculino']),
  isPregnant: z.boolean().default(false),
  weeksPregnant: z.number().optional(),
  weightBeforePregnancy: z.number().optional(),
});
export const nutriResponse = z.object({
  cpfOrCnpj: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  fullAdrees: z.string().optional(),
  crnCode: z.string().optional(),
  crn: z.string().optional(),
});
export type NutriInfo = z.infer<typeof nutriResponse>;
