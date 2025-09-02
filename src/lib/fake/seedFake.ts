import { PrismaClient } from '@prisma/client';
import { createFakeExternalModule } from './createFakeExternalModule';
import { createFakeUser } from './createFakeUser';
import { range } from './range';

const prisma = new PrismaClient();

export async function main() {
	await prisma.externalModule.deleteMany({ where: { isForDevTesting: true } });
	await prisma.user.deleteMany({ where: { isForDevTesting: true } });

	const users = await Promise.all(range(10).map(() => createFakeUser()));
	const userIds = users.map((user) => user.id);

	range(10).map(() => createFakeExternalModule(userIds));
}

main();
