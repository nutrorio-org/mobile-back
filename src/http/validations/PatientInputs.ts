import { z } from 'zod';

export class PatientInput {
  ID(id: string) {
    const idSchema = z.string().max(24, { message: 'max 24 caracteres' });
    const validate = idSchema.safeParse(id);
    if (validate.success) return id;
    return null;
  }
  Password(password: string) {
    const passwordSchema = z.object({
      password: z.string().min(8),
    });
    const validate = passwordSchema.safeParse(password);
    if (validate.success) return password;
    return null;
  }
  Login(body: { password: string; cpf: string }) {
    const loginSchema = z.object({
      password: z.string().min(6),
      cpf: z.string().min(11),
    });
    const validate = loginSchema.safeParse(body);
    if (validate.success) return body;
    return null;
  }
}
