import * as z from 'zod';

export const LoginShema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export const RegisterShema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
