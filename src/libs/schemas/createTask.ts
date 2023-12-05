import { z } from 'zod';

export const createTaskSchema = z.object({
  collectionId: z.number().nonnegative(),
  content: z
    .string()
    .min(1, { message: 'Task must contain at least 1 characters.' }),
  expires_at: z.date().optional()
});

export type createTaskSchemaType = z.infer<typeof createTaskSchema>;
