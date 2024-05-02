import z from 'zod';

export const LoginPatient = z.object({
  cpf: z.string().min(11, { message: 'CPF invalido' }),
  password: z.string().min(6, { message: 'Senha invalida' }),
});
