import prisma from '$lib/prisma';
import { generateUniqueUsername } from './username/generateUniqueUsername';
import { getIsUsernameAvailableFromDatabase } from './username/getIsUsernameAvailableFromDatabase';
import { verifyGoogleCode } from './verifyGoogleCode';

export async function signIn(credential: string) {
	// DEBUG create a separate route for signInWithCode
	const payload = await verifyGoogleCode(credential);
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
		getIsUsernameAvailableFromDatabase,
	);
	return await prisma.user.create({ data: { name, email, username } });
}
