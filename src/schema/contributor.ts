import { z } from 'zod';

export const contributorSchema = z.object({
  login: z.string(),
  contributions: z.number(),
  type: z.string(),
});

export type ApiContributor = z.infer<typeof contributorSchema>;
