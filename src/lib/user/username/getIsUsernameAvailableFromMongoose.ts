import prisma from '$lib/prisma';

export async function getIsUsernameAvailableFromMongoose(username: string) {
	const count = await prisma.user.count({ where: { username } });
	return count === 0;
}
