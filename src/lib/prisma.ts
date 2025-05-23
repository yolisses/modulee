import { DATABASE_URL } from '$env/static/private';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient({
	datasourceUrl: DATABASE_URL,
	omit: {
		user: {
			email: true,
		},
	},
});

export default prisma;
