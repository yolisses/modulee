import z from 'zod';

export const InputPathSchema = z.object({
	nodeId: z.string(),
	inputKey: z.string(),
});
