import z from 'zod';

export const environmentValidator = z.object({
  DB_HOST: z.string().min(1),
  DB_PORT: z
    .string()
    .min(1)
    .transform((val) => parseInt(val, 10)),
  DB_NAME: z.string().min(1),
  DB_PASS: z.string().min(1),
  DB_SYNC: z
    .string()
    .min(1)
    .transform((val) => val === 'true'),
});
