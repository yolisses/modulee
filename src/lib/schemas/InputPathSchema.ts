import z from 'zod/v4';

export const InputPathSchema = z.object({
	nodeId: z.uuid(),
	inputKey: z.string(),
});
