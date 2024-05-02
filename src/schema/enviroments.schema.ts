import 'dotenv/config';

export const PORT: number = Number(process.env.PORT) ?? 4005;
export const JWT_SECRET: string = process.env.JWT_SECRET ?? 'secretTest';
