import prisma from '$lib/prisma';

export async function addLike(userId: string, externalModuleId: string) {
	return prisma.$transaction(async (tx) => {
		await tx.like.create({ data: { userId, externalModuleId } });
		await tx.externalModule.update({
			where: { id: externalModuleId },
			data: { likeCount: { increment: 1 } },
		});
	});
}
