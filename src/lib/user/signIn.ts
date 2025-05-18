import prisma from '$lib/prisma';
import { generateUniqueUsername } from './username/generateUniqueUsername';
import { getIsUsernameAvailableFromMongoose } from './username/getIsUsernameAvailableFromMongoose';
import { verifyGoogleCredential } from './verifyGoogleCredential';

export async function signIn(credential: string) {
	const payload = await verifyGoogleCredential(credential);
	const { name, email } = payload;
	if (!email) {
		throw new Error('Missing email');
	}
	if (!name) {
		throw new Error('Missing name');
	}

	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) {
		return existingUser;
	}

	const username = await generateUniqueUsername(
		name,
		{ maxAttempts: 100, getRandomValue: () => Math.random() },
		getIsUsernameAvailableFromMongoose,
	);
	return await prisma.user.create({ data: { name, email, username } });
}
