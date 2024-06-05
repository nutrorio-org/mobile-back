import 'dotenv/config';

export const PORT: number = Number(process.env.PORT ?? 4005) ?? 4005;
export const JWT_SECRET: string = process.env.JWT_SECRET ?? 'secretTest';
export const FIREBASE_APP_ID: string = process.env.FIREBASE_APP_ID ?? '';
export const FIREBASE_API_KEY: string = process.env.FIREBASE_API_KEY ?? '';
export const NODE_ENV = process.env.NODE_ENV ?? 'LOCAL';
