import { z } from 'zod';

export const RecoveryPasswordSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .min(1, 'Email is required')
    .max(100, 'Email is too long'),
});

export type RecoveryPassword = z.infer<typeof RecoveryPasswordSchema>;
