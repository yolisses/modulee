import prisma from '$lib/prisma';
import type { ProjectData } from './ProjectData';

export function patchProject({
	id,
	data,
	userId,
}: {
	id: string;
	userId: string;
	data: Partial<ProjectData>;
}) {
	const { name, moduleType, graph, description } = data;
	data = { name, moduleType, graph, description };

	return prisma.project.update({ where: { id, userId }, data });
}
