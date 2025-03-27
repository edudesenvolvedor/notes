import { z } from 'zod';

export const CreateNoteSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type CreateNote = z.infer<typeof CreateNoteSchema>;
