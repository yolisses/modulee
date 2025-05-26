import { createShortId } from '$lib/data/createShortId';
import prisma from '$lib/prisma';
import { generateUniqueUsername } from './username/generateUniqueUsername';
import { getIsUsernameAvailableFromDatabase } from './username/getIsUsernameAvailableFromDatabase';

function createGuestEmail(username: string) {
	return username + '@guest.modulee.com';
}

export async function createGuestUser() {
	const name = 'Guest ' + createShortId();

	const username = await generateUniqueUsername(
		name,
		{ maxAttempts: 100, getRandomValue: () => Math.random() },
		getIsUsernameAvailableFromDatabase,
	);

	return await prisma.user.create({
		data: {
			name,
			username,
			isGuest: true,
			email: createGuestEmail(name),
		},
	});
}
