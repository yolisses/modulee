import z from 'zod/v4';
import { ModuleReferenceSchema } from '../ModuleReferenceSchema';
import { NodeBaseSchema } from '../NodeBaseSchema';

export const ModuleVoicesNodeSchema = NodeBaseSchema(
	'ModuleVoicesNode',
	[],
	z.object({
		moduleReference: ModuleReferenceSchema.optional(),
	}),
);
