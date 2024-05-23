import { z } from 'zod';

const extraInfoSchema = z.object({
  data: z.array(
    z.object({
      name: z.string(),
      value: z.union([z.string(), z.number()]), // Notei que "value" pode ser string ou número
    })
  ),
  protocol: z.object({
    value: z.string(),
    author: z.string(),
    folds: z.number(),
    params: z.array(z.string()),
  }),
});

const avaliacaoSchema = z.object({
  id: z.string(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }), // Refining to ensure it's a valid date string
  patientId: z.string(),
  height: z.number(),
  weight: z.number(),
  imc: z.number(),
  title: z.string(),
  MassaGorda: z.number(),
  MassaMagra: z.number(),
  DensidadeCorporal: z.number(),
  PesoMuscular: z.number(),
  PesoOsseo: z.number(),
  PesoResidual: z.number(),
  RazaoCinturaQuadril: z.number(),
  AreaMusculardoBraco: z.number(),
  MassaGordaKG: z.number(),
  MassaMagraKG: z.number(),
  photos: z.array(z.unknown()), // Assuming photos can be any type as it's empty
  anexo: z.string(),
  extraInfo: extraInfoSchema,
});
export const listAvaliacaoSchema = z
  .object({
    id: z.string(),
    date: z.date(),
    title: z.string(),
  })
  .array();
export type Avalicao = z.infer<typeof avaliacaoSchema>;
export type FieldName =
  | 'circunferencia-braco-direito-relaxado'
  | 'circunferencia-antebraco-direito'
  | 'circunferencia-braco-direito-contraido'
  | 'circunferencia-coxa-direita'
  | 'circunferencia-coxa-esquerda'
  | 'circunferencia-panturrilha-direita'
  | 'circunferencia-ombro'
  | 'circunferencia-panturrilha-esquerda'
  | 'circunferencia-pescoco'
  | 'circunferencia-antebraco-esquerdo'
  | 'circunferencia-peitoral'
  | 'circunferencia-braco-esquerdo-relaxado'
  | 'circunferencia-braco-esquerdo-contraido'
  | 'circunferencia-abdomen'
  | 'circunferencia-cintura'
  | 'circunferencia-quadril'
  | 'biceps'
  | 'triceps'
  | 'abdominal'
  | 'suprailiaca'
  | 'subEscapular'
  | 'torax'
  | 'axilarMedia'
  | 'coxaProximal'
  | 'panturrilhaMedial'
  | 'bioimpedancia-idade-metabolica'
  | 'bioimpedancia-massa-gorda'
  | 'bioimpedancia-massa-magra'
  | 'bioimpedancia-porcentagem-massa-magra'
  | 'bioimpedancia-porcentagem-massa-gorda'
  | 'bioimpedancia-agua-corporal'
  | 'bioimpedancia-peso-osseo'
  | 'bioimpedancia-peso-muscular'
  | 'bioimpedancia-idade-metabolica'
  | 'bioimpedancia-gordura-visceral'
  | 'bioimpedancia-porcentagem-gordura-visceral'
  | 'punho'
  | 'umero'
  | 'femur'
  | 'left-hand'
  | 'rigth-hand';
