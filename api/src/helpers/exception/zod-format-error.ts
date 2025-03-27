import { z } from 'zod';

export const zodFormatError = (error: z.ZodError) => {
  return {
    status: 'fail',
    errors: error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    })),
  };
};
