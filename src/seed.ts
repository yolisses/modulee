import { Prisma, PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
	{
		name: 'Alice',
		isSeeded: true,
		username: 'alice',
		email: 'alice@email.com',
	},
	{
		name: 'Bob',
		isSeeded: true,
		username: 'bob',
		email: 'bob@email.com',
		externalModules: {
			create: [
				{
					name: 'test1',
					isSeeded: true,
					projectId: 'test1',
					description: 'test1',
				},
			],
		},
	},
];

export async function main() {
	await prisma.externalModule.deleteMany({ where: { isSeeded: true } });
	await prisma.user.deleteMany({ where: { isSeeded: true } });

	for (const u of userData) {
		await prisma.user.create({ data: u });
	}
}

main();
