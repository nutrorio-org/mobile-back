export interface FoodItem {
  name: string;
  value: number;
}
export type WeekDayFull =
  | 'Segunda-feira'
  | 'Terça-feira'
  | 'Quarta-feira'
  | 'Quinta-feira'
  | 'Sexta-feira'
  | 'Sábado'
  | 'Domingo'
  | 'Semana';

export interface FoodPlan {
  weekDay: WeekDayFull;
  meals: Meal[];
  /** string: author nickname */
  author: string;
  //type: string
}
export interface Meal {
  id: string;
  title: string;
  time: string;
  foods: Food[];
  /** string: author nickname */
  author: string;
  substituicao?: Substituicao[];
}
export interface Substituicao {
  food: Food;
  observation?: string;
}
export interface Macronutrients {
  proteinas: Macronutrient;
  carboidratos: Macronutrient;
  lipideos: Macronutrient;
}
export interface Macronutrient {
  acronym: 'CHO' | 'PTO' | 'LIP';
  acronymFull: 'Carbohydrates' | 'Proteins' | 'Fats';
  amount: number | TraceNotFound;
}
type TraceNotFound = number; // 'NA' | 'Tr'

export interface Food {
  id?: string;
  nutrorio: string;

  tableName: string;
  author?: string;

  name?: string;
  energiaKcal?: number;

  tipo: string;
  nomeMedida: string;
  valorEmGramas: number;
  multiplicador: number;
  categoria: string;
  macronutrients: Macronutrients;
  micronutrients: Micronutrients;
  //fenilalanina?: number | TraceNotFound;
  quantidade?: number | TraceNotFound;
  umidade?: number | TraceNotFound;
  //energiaKJ?: number | TraceNotFound;
  colesterol?: number | TraceNotFound;
  cinzas?: number | TraceNotFound;
  gordPolinsaturada?: number | TraceNotFound;
  gordMonoinsaturada?: number | TraceNotFound;
  gordSaturadas?: number | TraceNotFound;

  acidosGraxos120?: number | TraceNotFound;
  acidosGraxos140?: number | TraceNotFound;
  acidosGraxos160?: number | TraceNotFound;
  acidosGraxos180?: number | TraceNotFound;
  acidosGraxos200?: number | TraceNotFound;
  acidosGraxos220?: number | TraceNotFound;
  acidosGraxos240?: number | TraceNotFound;
  acidosGraxos141?: number | TraceNotFound;
  acidosGraxos161?: number | TraceNotFound;
  acidosGraxos181?: number | TraceNotFound;
  acidosGraxos201?: number | TraceNotFound;
  acidosGraxos182n6?: number | TraceNotFound;
  acidosGraxos183n3?: number | TraceNotFound;
  acidosGraxos204?: number | TraceNotFound;
  acidosGraxos205?: number | TraceNotFound;
  acidosGraxos225?: number | TraceNotFound;
  acidosGraxos226?: number | TraceNotFound;
  acidosGraxos181t?: number | TraceNotFound;
  acidosGraxos182t?: number | TraceNotFound;
  //novos nutrients
}
export interface Micronutrients {
  //retinol==vitA
  vitaminaA?: number | TraceNotFound;
  re?: number | TraceNotFound;
  rae?: number | TraceNotFound;
  vitaminaC?: number | TraceNotFound;
  vitaminaB1?: number | TraceNotFound;
  vitaminaB2?: number | TraceNotFound;
  vitaminaB3?: number | TraceNotFound;
  vitaminaB6?: number | TraceNotFound;
  sodio?: number | TraceNotFound;
  calcio?: number | TraceNotFound;
  magnesio?: number | TraceNotFound;
  zinco?: number | TraceNotFound;
  manganes?: number | TraceNotFound;
  potassio?: number | TraceNotFound;
  fosforo?: number | TraceNotFound;
  ferro?: number | TraceNotFound;
  cobre?: number | TraceNotFound;
  fibraAlimentar?: number | TraceNotFound;
  //novos micro
  fenilalanina?: number | TraceNotFound;
  iodo?: number | TraceNotFound;
  vitaminaB5?: number | TraceNotFound;
  vitaminaB9?: number | TraceNotFound;
  vitaminaB12?: number | TraceNotFound;
  vitaminaD?: number | TraceNotFound;
  vitaminaE?: number | TraceNotFound;

  selenio?: number | TraceNotFound;
}
export interface ResponseFoodPlan {
  id: string;
  patientId: string;
  date: string;
  title: string;
  foodPlans: FoodPlan[];
  //userNickname: string;
  type: string;
}
