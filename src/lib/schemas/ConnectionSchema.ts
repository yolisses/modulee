import z from 'zod/v4';
import { InputPathSchema } from './InputPathSchema';

export const ConnectionSchema = z.object({
	id: z.uuidv4(),
	targetNodeId: z.uuidv4(),
	inputPath: InputPathSchema,
});
