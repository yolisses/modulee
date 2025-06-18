import prisma from '$lib/prisma';
import { generateUniqueUsername } from '$lib/user/username/generateUniqueUsername';
import { faker } from '@faker-js/faker';
import { getFakeIsAvailable } from './getFakeIsAvailable';

export async function createFakeUser() {
	const firstName = faker.person.firstName();
	const lastName = faker.person.firstName();
	const name = firstName + ' ' + lastName;
	const username = await generateUniqueUsername(
		name,
		{ getRandomValue: Math.random },
		getFakeIsAvailable,
	);
	return prisma.user.create({
		data: {
			name,
			username,
			isGuest: false,
			isForDevTesting: true,
			bio: faker.person.bio(),
			email: faker.internet.email({ firstName, lastName }),
		},
	});
}
