import z from 'zod/v4';
import { InputPathSchema } from './InputPathSchema';

export const ConnectionSchema = z.object({
	id: z.string(),
	targetNodeId: z.string(),
	inputPath: InputPathSchema,
});
