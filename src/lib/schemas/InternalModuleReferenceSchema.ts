import z from 'zod/v4';

export const InternalModuleReferenceSchema = z.object({
	id: z.string(),
	type: z.literal('internal'),
});
