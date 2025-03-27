import { z } from 'zod';

export const UpdateNoteSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type UpdateNote = z.infer<typeof UpdateNoteSchema>;
