import z from 'zod/v4';

export const InternalModuleReferenceSchema = z.object({
	id: z.uuidv4(),
	type: z.literal('internal'),
});
