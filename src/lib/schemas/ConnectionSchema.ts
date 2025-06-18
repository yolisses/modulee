import z from 'zod/v4';
import { InputPathSchema } from './InputPathSchema';

export const ConnectionSchema = z.object({
	id: z.uuid(),
	targetNodeId: z.uuid(),
	inputPath: InputPathSchema,
});
