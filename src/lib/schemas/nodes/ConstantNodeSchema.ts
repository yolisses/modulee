import z from 'zod/v4';
import { NodeBaseSchema } from '../NodeBaseSchema';

export const ConstantNodeSchema = NodeBaseSchema(
	'ConstantNode',
	['input'],
	z.object({ value: z.number() }),
);
