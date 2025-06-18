import z from 'zod/v4';

export const ExternalModuleReferenceSchema = z.object({
	id: z.uuidv4(),
	type: z.literal('external'),
});
