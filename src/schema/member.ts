import { z } from 'zod';

export const memberSchema = z.object({
  login: z.string(),
  type: z.string(),
});

export type ApiMember = z.infer<typeof memberSchema>;
