import { ModuleTypeSchema } from '$lib/db/externalModule/ModuleTypeSchema';
import prisma from '$lib/prisma';
import { ProjectSchema } from '$lib/schemas/ProjectSchema';
import type { ProjectData } from '../data/ProjectData';
import { createGraphDataByModuleType } from '../ui/createGraphDataByModuleType';

export async function createProject(arg: object) {
	const data = ProjectSchema.pick({ name: true, userId: true, moduleType: true }).parse(arg);

	const moduleType = ModuleTypeSchema.parse(data.moduleType);
	const graphData = createGraphDataByModuleType(moduleType);

	const projectData = await prisma.project.create({ data: { ...data, graph: graphData } });

	return projectData as unknown as ProjectData;
}
