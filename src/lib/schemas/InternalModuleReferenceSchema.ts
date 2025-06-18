import z from 'zod/v4';

export const InternalModuleReferenceSchema = z.object({
	id: z.uuid(),
	type: z.literal('internal'),
});
