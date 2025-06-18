import { ModuleTypeSchema } from '$lib/db/externalModule/ModuleTypeSchema';
import prisma from '$lib/prisma';
import { GraphSchema } from '$lib/schemas/GraphSchema';
import { z } from 'zod/v4';

export function patchProject({ id, userId, data }: { id: string; userId: string; data: object }) {
	const schema = z.object({
		name: z.string().optional(),
		graph: GraphSchema.optional(),
		description: z.string().optional(),
		moduleType: ModuleTypeSchema.optional(),
	});
	return prisma.project.update({ where: { id, userId }, data: schema.parse(data) });
}
