import prisma from '$lib/prisma';
import { verifyGoogleCredential } from './getCredentialFromCode';
import { generateUniqueUsername } from './username/generateUniqueUsername';
import { getIsUsernameAvailableFromDatabase } from './username/getIsUsernameAvailableFromDatabase';
import { getCredentialFromCode } from './verifyGoogleCode';

type SignInParams =
	| { code?: undefined; credential: string }
	| { code: string; credential?: undefined };

export async function signIn(params: SignInParams) {
	const credential = params.credential ?? (await getCredentialFromCode(params.code));
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
		getIsUsernameAvailableFromDatabase,
	);
	return await prisma.user.create({ data: { name, email, username } });
}
