import * as process from 'node:process';

export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};
