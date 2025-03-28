import { z } from 'zod';

export const SignInSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type SignIn = z.infer<typeof SignInSchema>;

export class SignInUserDto {
  name: string;
  email: string;
  password: string;
}
