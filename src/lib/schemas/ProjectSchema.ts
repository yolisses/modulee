import z from 'zod/v4';
import { ModuleTypeSchema } from '../db/externalModule/ModuleTypeSchema';
import { GraphSchema } from './GraphSchema';

export const ProjectSchema = z.object({
	id: z.string(),
	name: z.string(),
	graph: GraphSchema,
	userId: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	moduleType: ModuleTypeSchema,
	description: z.string().optional(),
});
