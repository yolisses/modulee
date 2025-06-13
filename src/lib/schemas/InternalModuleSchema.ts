import z from 'zod';

export const InternalModuleSchema = z.object({
	id: z.string(),
	name: z.string(),
});
