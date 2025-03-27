import * as bcrypt from 'bcrypt';

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
