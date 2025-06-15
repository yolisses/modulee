import z from 'zod/v4';

export const ExternalModuleReferenceSchema = z.object({
	id: z.string(),
	type: z.literal('external'),
});
