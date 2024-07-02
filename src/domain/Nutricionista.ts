import { z } from 'zod';

// Definição do schema usando Zod
const NutricionistaSchema = z.object({
  cpfOrCnpj: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  fullAdrees: z.string().optional(),
  crnCode: z.string().optional(),
  crn: z.string().optional(),
});
type NutricionistaType = z.infer<typeof NutricionistaSchema>;

// Definição da classe Nutricionista
export class Nutricionista {
  cpfOrCnpj?: string;
  name: string;
  email: string;
  phone: string;
  fullAdrees?: string;
  crnCode?: string;
  crn?: string;

  // Construtor
  constructor(nutricionista: NutricionistaType) {
    this.cpfOrCnpj = nutricionista.cpfOrCnpj;
    this.name = nutricionista.name;
    this.email = nutricionista.email;
    this.phone = this.sanitizeNumberInput(nutricionista.phone);
    this.fullAdrees = nutricionista.fullAdrees;
    this.crnCode = nutricionista.crnCode;
    this.crn = nutricionista.crn;
  }
  private sanitizeNumberInput(input: string) {
    // Remove espaços vazios
    let sanitizedInput = input.replace(/\s+/g, '');
    // Remove qualquer coisa que não seja número
    sanitizedInput = sanitizedInput.replace(/\D+/g, '');
    return `55${sanitizedInput}`;
  }

  // Método estático para criar uma instância da classe Nutricionista
  static create(nutricionista: NutricionistaType): Nutricionista | null {
    // Validação usando Zod
    const parsedNutricionista = NutricionistaSchema.safeParse(nutricionista);
    if (parsedNutricionista.success)
      return new Nutricionista(parsedNutricionista.data);
    return null;
  }
}
