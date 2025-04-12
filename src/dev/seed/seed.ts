import { createId } from '$lib/data/createId';
import type { UserData } from '$lib/user/UserData';
import { generateUniqueUsername } from '$lib/user/username/generateUniqueUsername';
import { faker } from '@faker-js/faker';

const userCount = 10;
const usersData: UserData[] = [];

function getRandomValue() {
	return Math.random();
}

async function getIsAvailable() {
	return true;
}

for (let i = 0; i < userCount; i++) {
	const name = faker.person.fullName();
	const userData: UserData = {
		name,
		id: createId(),
		bio: faker.person.bio(),
		email: faker.internet.email(),
		username: await generateUniqueUsername(name, { getRandomValue }, getIsAvailable),
	};
	usersData.push(userData);
}
