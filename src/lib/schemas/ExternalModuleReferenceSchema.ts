import z from 'zod/v4';

export const ExternalModuleReferenceSchema = z.object({
	moduleId: z.uuidv4(),
	type: z.literal('external'),
});
