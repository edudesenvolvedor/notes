import { z } from 'zod';

export const RefreshToken = z.object({
  token: z.string(),
});

export type RefreshToken = z.infer<typeof RefreshToken>;
