import { z } from 'zod';

export const SignUpUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type SignUp = z.infer<typeof SignUpUserSchema>;
