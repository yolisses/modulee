import { createId } from '$lib/data/createId';
import type { ExternalModuleDocument } from '$lib/db/externalModule/ExternalModuleDocument';
import { ExternalModuleModel } from '$lib/db/externalModule/ExternalModuleModel';
import type { UserDocument } from '$lib/user/UserDocument';
import { UserModel } from '$lib/user/UserModel';
import { generateUniqueUsername } from '$lib/user/username/generateUniqueUsername';
import { faker } from '@faker-js/faker';
import { config } from 'dotenv';
import { connect, disconnect, Types } from 'mongoose';
import { fakeGraphData } from './fakeGraphData';
import { range } from './range';
import { unseed } from './unseed';

// TODO find a more secure way to run seed.ts as a server only file.
//
// This is a bypass to SvelteKit env variables protection.
config();

const userCount = 10;
const externalModuleCount = 10;

async function getIsAvailable() {
	return true;
}

type UserSeedData = Partial<UserDocument>;
const usersData: UserSeedData[] = [];
for (let i = 0; i < userCount; i++) {
	const name = faker.person.fullName();
	const userData: UserSeedData = {
		name,
		isSeeded: true,
		bio: faker.person.bio(),
		email: faker.internet.email(),
		_id: new Types.ObjectId(),
		username: await generateUniqueUsername(name, { getRandomValue: Math.random }, getIsAvailable),
	};
	usersData.push(userData);
}

type ExternalModuleSeedData = Partial<ExternalModuleDocument>;
const externalModulesData: ExternalModuleSeedData[] = [];

for (let i = 0; i < externalModuleCount; i++) {
	const userData = faker.helpers.arrayElement(usersData);
	const externalModuleData: ExternalModuleSeedData = {
		id: createId(),
		isSeeded: true,
		userId: userData._id,
		projectId: createId(),
		graph: fakeGraphData(),
		name: faker.commerce.productName(),
		likeCount: faker.number.int(100000),
		usageCount: faker.number.int(100000),
		updatedAt: faker.date.past().toISOString(),
		description: range(10)
			.map(() => {
				return faker.commerce.productDescription();
			})
			.join('\n'),
		version: {
			major: faker.number.int(10),
			minor: faker.number.int(20),
			patch: faker.number.int(20),
		},
	};
	externalModulesData.push(externalModuleData);
}

// Just to make TypeScript happy
declare const process: {
	env: Record<string, string>;
};

await connect(process.env.MONGODB_URI);
await unseed();
await UserModel.insertMany(usersData);
await ExternalModuleModel.insertMany(externalModulesData);
await disconnect();
