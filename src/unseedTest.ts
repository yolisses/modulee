import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

export async function main() {
	await prisma.externalModule.deleteMany({ where: { isForDevTesting: true } });
	await prisma.user.deleteMany({ where: { isForDevTesting: true } });
	console.log('Successfully removed all data for dev testing');
}

main();
