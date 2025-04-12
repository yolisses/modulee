import { createId } from '$lib/data/createId';
import type { Seedable } from '$lib/db/externalModule/Seedable';
import type { UserData } from '$lib/user/UserData';
import { UserModel } from '$lib/user/UserModel';
import { generateUniqueUsername } from '$lib/user/username/generateUniqueUsername';
import { faker } from '@faker-js/faker';
import { config } from 'dotenv';
import { connect, disconnect } from 'mongoose';
import { process } from './process';

// TODO find a more secure way to run seed.ts as a server only file.
//
// This is a bypass to SvelteKit env variables protection.
config();

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
	const userData: Seedable<UserData> = {
		name,
		id: createId(),
		isSeeded: true,
		bio: faker.person.bio(),
		email: faker.internet.email(),
		username: await generateUniqueUsername(name, { getRandomValue }, getIsAvailable),
	};
	usersData.push(userData);
}

await connect(process.env.MONGO_DB_URL);
await UserModel.insertMany(usersData);
await disconnect();
