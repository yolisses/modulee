import z from 'zod/v4';

export const InputPathSchema = z.object({
	nodeId: z.string(),
	inputKey: z.string(),
});
