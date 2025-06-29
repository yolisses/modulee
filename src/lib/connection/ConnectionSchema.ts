import { InputPathSchema } from '$lib/schemas/InputPathSchema';
import z from 'zod/v4';

export const ConnectionSchema = z.object({
	id: z.uuidv4(),
	targetNodeId: z.uuidv4(),
	inputPath: InputPathSchema,
});
