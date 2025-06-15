import z from 'zod/v4';
import { ModuleReferenceSchema } from '../ModuleReferenceSchema';
import { NodeBaseSchema } from '../NodeBaseSchema';

export const ModuleNodeSchema = NodeBaseSchema(
	'ModuleNode',
	[],
	z.object({
		moduleReference: ModuleReferenceSchema.optional(),
	}),
);
