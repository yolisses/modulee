import { moduleTypeEnum } from '$lib/db/externalModule/moduleTypeEnum';
import prisma from '$lib/prisma';
import { z } from 'zod/v4';
import type { ProjectData } from './ProjectData';

const schema = z.object({
	name: z.string(),
	userId: z.string(),
	moduleType: moduleTypeEnum,
	graph: z.object({ nodes: z.array(z.string()) }),
});

export async function createProject(projectData: ProjectData) {
	const { id, name, userId, graph, moduleType } = projectData;
	return prisma.project.create({
		data: { id, name, graph, userId, moduleType },
	});
}
