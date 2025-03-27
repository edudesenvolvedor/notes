import { z } from 'zod';

export const RefreshTokenSchema = z.object({
  token: z.string(),
});

export type RefreshToken = z.infer<typeof RefreshTokenSchema>;
