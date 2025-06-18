import { createId } from '$lib/data/createId';
import type { GraphData } from '$lib/data/GraphData';
import type { ModuleType } from '$lib/project/ModuleType';
import { generateUniqueUsername } from '$lib/user/username/generateUniqueUsername';
import { faker } from '@faker-js/faker';
import { range } from './range';
import prisma from '$lib/prisma';

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
			isGuest: false,
			isForDevTesting: true,
			bio: faker.person.bio(),
			email: faker.internet.email({ firstName, lastName }),
		},
	});
}

function createModuleType() {
	const moduleTypes: ModuleType[] = ['utility', 'effect', 'instrument'];
	return faker.helpers.arrayElement(moduleTypes);
}

async function createExternalModule(userIds: string[]) {
	await prisma.externalModule.create({
		data: {
			graph: createGraph(),
			projectId: createId(),
			userId: getRandomItem(userIds),
			moduleType: createModuleType(),
			description: createDescription(),
			name: faker.commerce.productName(),
		},
	});
}

function createGraph(): GraphData {
	const mainInternalModuleId = createId();
	return {
		nodes: [],
		connections: [],
		mainInternalModuleId,
		externalModuleReferences: [],
		internalModules: [{ name: 'Main module', id: mainInternalModuleId }],
	};
}

function createDescription() {
	return range(10)
		.map(() => {
			return (
				range(4)
					.map(() => faker.commerce.productDescription())
					.join('. ') + '.'
			);
		})
		.join('\n');
}

function getRandomItem<T>(items: T[]) {
	const index = Math.floor(Math.random() * items.length);
	return items[index];
}

export async function main() {
	await prisma.externalModule.deleteMany({ where: { isForDevTesting: true } });
	await prisma.user.deleteMany({ where: { isForDevTesting: true } });

	const users = await Promise.all(range(10).map(() => createUser()));
	const userIds = users.map((user) => user.id);

	range(10).map(() => createExternalModule(userIds));
}

main();
