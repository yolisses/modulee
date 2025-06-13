import prisma from '$lib/prisma';
import { ProjectSchema } from '$lib/schemas/ProjectSchema';
import type { z } from 'zod/v4';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DataWithoutTimeStamps = ProjectSchema.omit({ createdAt: true, updatedAt: true });

type DTO = z.infer<typeof DataWithoutTimeStamps>;

export async function createProject(projectData: DTO) {
	const { id, name, userId, graph, moduleType } = projectData;
	return prisma.project.create({
		data: { id, name, graph, userId, moduleType },
	});
}
