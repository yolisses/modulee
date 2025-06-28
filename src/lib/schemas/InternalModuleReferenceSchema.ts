import z from 'zod/v4';

export const InternalModuleReferenceSchema = z.object({
	moduleId: z.uuidv4(),
	type: z.literal('internal'),
});
