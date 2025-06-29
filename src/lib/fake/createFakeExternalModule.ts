import { createId } from '$lib/global/createId';
import prisma from '$lib/prisma';
import { faker } from '@faker-js/faker';
import { createFakeDescription } from './createFakeDescription';
import { createFakeGraph } from './createFakeGraph';
import { createFakeModuleType } from './createFakeModuleType';
import { getRandomItem } from './getRandomItem';

export async function createFakeExternalModule(userIds: string[]) {
	const moduleType = createFakeModuleType();
	await prisma.externalModule.create({
		data: {
			moduleType,
			projectId: createId(),
			userId: getRandomItem(userIds),
			graph: createFakeGraph(moduleType),
			description: createFakeDescription(),
			name: faker.commerce.productName(),
		},
	});
}
