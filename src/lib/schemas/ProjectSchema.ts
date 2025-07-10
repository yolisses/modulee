import z from 'zod/v4';
import { ModuleTypeSchema } from '../db/externalModule/ModuleTypeSchema';
import { GraphSchema } from './GraphSchema';

export const ProjectSchema = z.object({
	id: z.uuidv4(),
	name: z.string(),
	graph: GraphSchema,
	userId: z.uuidv4(),
	createdAt: z.string(),
	updatedAt: z.string(),
	moduleType: ModuleTypeSchema,
	description: z.string().nullish(),
});
