import { z } from 'zod';

export const RefreshTokenSchema = z.object({
  token: z.string().min(1, 'Token is required').max(500, 'Token is too long'),
});

export type RefreshToken = z.infer<typeof RefreshTokenSchema>;
