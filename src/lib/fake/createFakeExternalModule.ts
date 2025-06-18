import { createId } from '$lib/data/createId';
import prisma from '$lib/prisma';
import { faker } from '@faker-js/faker';
import { createFakeDescription } from './createFakeDescription';
import { getRandomItem } from './getRandomItem';
import { createFakeGraph } from './createFakeGraph';
import { createFakeModuleType } from './createFakeModuleType';

export async function createFakeExternalModule(userIds: string[]) {
	await prisma.externalModule.create({
		data: {
			graph: createFakeGraph(),
			projectId: createId(),
			userId: getRandomItem(userIds),
			moduleType: createFakeModuleType(),
			description: createFakeDescription(),
			name: faker.commerce.productName(),
		},
	});
}
