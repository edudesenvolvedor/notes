import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type Login = z.infer<typeof LoginSchema>;
