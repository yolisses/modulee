import z from 'zod/v4';

export const InputPathSchema = z.object({
	nodeId: z.uuidv4(),
	inputKey: z.string(),
});
