import z from 'zod/v4';
import { NodeBaseSchema } from '../NodeBaseSchema';

// Node variants

export const InputNodeSchema = NodeBaseSchema(
	'InputNode',
	[],
	z.object({
		min: z.number(),
		max: z.number(),
		name: z.string(),
		default: z.number(),
	}),
);
