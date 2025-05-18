import prisma from '$lib/prisma';

export async function removeLike(userId: string, externalModuleId: string) {
	return prisma.$transaction(async (transaction) => {
		await transaction.like.deleteMany({ where: { userId, externalModuleId } });
		await transaction.externalModule.update({
			where: { id: externalModuleId },
			data: { likeCount: { decrement: 1 } },
		});
	});
}
