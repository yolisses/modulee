import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
	omit: {
		externalModule: { isForDevTesting: true },
		user: { email: true, isForDevTesting: true },
	},
});

export default prisma;
