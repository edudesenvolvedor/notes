import { z } from 'zod';

export const ChangePasswordAfterRecoverySchema = z
  .object({
    new_password: z
      .string()
      .min(8, 'A nova senha deve ter pelo menos 8 caracteres')
      .regex(/[a-zA-Z]/, 'A nova senha deve conter letras')
      .regex(/[0-9]/, 'A nova senha deve conter números'),
    password_confirmation: z
      .string()
      .min(8, 'A confirmação de senha deve ter pelo menos 8 caracteres'),
  })
  .refine((data) => data.new_password === data.password_confirmation, {
    message: 'A confirmação de senha deve ser igual à nova senha',
    path: ['password_confirmation'],
  });

export type ChangePasswordAfterRecovery = z.infer<
  typeof ChangePasswordAfterRecoverySchema
>;
