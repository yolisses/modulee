import z from 'zod/v4';

export const ExternalModuleReferenceSchema = z.object({
	id: z.uuid(),
	type: z.literal('external'),
});
