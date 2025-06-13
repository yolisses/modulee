import z from 'zod/v4';

export const InputNodeExtrasSchema = z.object({
	min: z.number(),
	max: z.number(),
	name: z.string(),
	default: z.number(),
});
