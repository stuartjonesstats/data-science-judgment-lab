import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cases = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cases' }),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    shortTitle: z.string().optional(),
    set: z.string(),
    sequence: z.number(),
    status: z.enum(['active', 'draft', 'stub']),
    difficulty: z.enum(['intro', 'standard', 'advanced']),
    domain: z.string(),
    estimatedMinutes: z.number(),
    caseType: z.string(),
    judgmentType: z.string(),
    summary: z.string(),
    skills: z.array(z.string()),
    concepts: z.array(z.string()),
    mediaTypes: z.array(z.string()),
    scoringProfile: z.string(),
  }),
});

export const collections = {
  cases,
};
