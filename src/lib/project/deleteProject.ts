import prisma from '$lib/prisma';

export function deleteProject({ id, userId }: { id: string; userId: string }) {
	return prisma.project.delete({ where: { id, userId } });
}
