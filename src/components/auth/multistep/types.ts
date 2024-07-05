import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().email(),
});

export const newUserSchema = z
  .object({
    password: z
      .string()
      .min(10, { message: 'Password must be at least 10 characters long' })
      .regex(/[a-z]/, {
        message: 'Password must include at least one lowercase letter (a-z)',
      })
      .regex(/[A-Z]/, {
        message: 'Password must include at least one uppercase letter (A-Z)',
      })
      .regex(/[0-9]/, {
        message: 'Password must include at least one number (0-9)',
      }),
    confirmPassword: z
      .string()
      .min(10, { message: 'Password must be at least 10 characters long' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const passwordExistSchema = z.object({
  password: z.string().min(6).regex(/[a-z]/).regex(/[A-Z]/).regex(/[0-9]/),
});

export type EmailFormValues = z.infer<typeof emailSchema>;
export type PasswordExistFormValues = z.infer<typeof passwordExistSchema>;
export type NewUserFormValues = z.infer<typeof newUserSchema>;
