import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

export const validatePassword = async (
  password: string,
  passwordHash: string,
) => {
  return await bcrypt.compare(password, passwordHash);
};

export const generationTokenToRecoveryPassword = async () => {
  return await bcrypt.hash('password', 10);
};

export const verifyJwt = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
      id: number;
      email: string;
      iat: number;
      exp: number;
    };
  } catch (error) {
    console.error('JWT inválido:', error.message);
    return null;
  }
};
