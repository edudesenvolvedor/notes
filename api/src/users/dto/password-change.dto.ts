import { z } from 'zod';

export const PasswordChangeSchema = z
  .object({
    password_current: z
      .string()
      .min(6, 'A senha atual deve ter pelo menos 6 caracteres'),
    new_password: z
      .string()
      .min(8, 'A nova senha deve ter pelo menos 8 caracteres')
      .regex(/[a-zA-Z]/, 'A nova senha deve conter letras')
      .regex(/[0-9]/, 'A nova senha deve conter números'),
    password_confirmation: z
      .string()
      .min(8, 'A confirmação de senha deve ter pelo menos 8 caracteres'),
  })
  .refine((data) => data.password_current !== data.new_password, {
    message: 'A senha atual deve ser diferente da nova senha',
    path: ['new_password'],
  })
  .refine((data) => data.new_password === data.password_confirmation, {
    message: 'A confirmação de senha deve ser igual à nova senha',
    path: ['password_confirmation'],
  });

export type PasswordChange = z.infer<typeof PasswordChangeSchema>;
