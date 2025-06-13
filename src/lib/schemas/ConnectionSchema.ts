import z from 'zod';
import { InputPathSchema } from './InputPathSchema';

export const ConnectionSchema = z.object({
	id: z.string(),
	targetNodeId: z.string(),
	inputPath: InputPathSchema,
});
