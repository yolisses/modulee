import z from 'zod/v4';

export const InternalModuleSchema = z.object({
	id: z.uuidv4(),
	name: z.string(),
});
