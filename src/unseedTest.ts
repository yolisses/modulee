import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

export async function main() {
	// Delete all seeded external modules
	await prisma.externalModule.deleteMany({
		where: { isSeeded: true },
	});

	// Delete all seeded users
	await prisma.user.deleteMany({
		where: { isSeeded: true },
	});

	console.log('Successfully removed all seeded data');
}

main();
