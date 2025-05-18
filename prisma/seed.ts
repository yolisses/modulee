import { Prisma, PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
	{
		name: 'Alice',
		email: 'alice@prisma.io',
		username: 'alice',
		isSeeded: true,
	},
	{
		name: 'Bob',
		email: 'bob@prisma.io',
		username: 'bob',
		isSeeded: true,
	},
];

export async function main() {
	for (const u of userData) {
		await prisma.user.create({ data: u });
	}
}

main();
