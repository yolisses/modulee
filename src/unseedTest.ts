import prisma from '$lib/prisma';

export async function main() {
	await prisma.externalModule.deleteMany({ where: { isForDevTesting: true } });
	await prisma.user.deleteMany({ where: { isForDevTesting: true } });
	console.log('Successfully removed all data for dev testing');
}

main();
