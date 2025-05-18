import { createId } from '$lib/data/createId';
import { range } from '$lib/server/range';
import { generateUniqueUsername } from '$lib/user/username/generateUniqueUsername';
import { faker } from '@faker-js/faker';
import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function getIsAvailable() {
	return true;
}

async function createUser() {
	const firstName = faker.person.firstName();
	const lastName = faker.person.firstName();
	const name = firstName + ' ' + lastName;
	const username = await generateUniqueUsername(
		name,
		{ getRandomValue: Math.random },
		getIsAvailable,
	);
	return prisma.user.create({
		data: {
			name,
			username,
			isSeeded: true,
			bio: faker.person.bio(),
			email: faker.internet.email({ firstName, lastName }),
		},
	});
}

async function createExternalModule(userIds: string[]) {
	await prisma.externalModule.create({
		data: {
			projectId: createId(),
			userId: getRandomItem(userIds),
			description: createDescription(),
			name: faker.commerce.productName(),
		},
	});
}

function createDescription() {
	return range(10)
		.map(() => {
			return faker.commerce.productDescription();
		})
		.join('\n');
}

function getRandomItem<T>(items: T[]) {
	const index = Math.floor(Math.random() * items.length);
	return items[index];
}

export async function main() {
	await prisma.externalModule.deleteMany({ where: { isSeeded: true } });
	await prisma.user.deleteMany({ where: { isSeeded: true } });

	const users = await Promise.all(range(10).map(() => createUser()));
	const userIds = users.map((user) => user.id);

	range(10).map(() => createExternalModule(userIds));
}

main();
