import { z } from 'zod';

export const createTaskSchema = z.object({
  collectionId: z.number().nonnegative(),
  content: z
    .string()
    .min(8, { message: 'Task must contain at least 8 characters.' }),
  expires_at: z.date().optional()
});

export type createTaskSchemaType = z.infer<typeof createTaskSchema>;
