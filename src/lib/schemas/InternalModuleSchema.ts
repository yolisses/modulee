import z from 'zod/v4';

export const InternalModuleSchema = z.object({
	id: z.uuid(),
	name: z.string(),
});
