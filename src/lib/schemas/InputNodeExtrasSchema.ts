import type { z } from '../../../node_modules/zod/dist/types/v3/external';

// InputNodeExtras schema (define as needed, using z.unknown() as placeholder)

export const InputNodeExtrasSchema = z.object({
	min: z.number(),
	max: z.number(),
	name: z.string(),
	default: z.number(),
});
