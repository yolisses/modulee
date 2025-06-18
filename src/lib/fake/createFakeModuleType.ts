import type { ModuleType } from '$lib/project/ModuleType';
import { faker } from '@faker-js/faker';

export function createFakeModuleType() {
	const moduleTypes: ModuleType[] = ['utility', 'effect', 'instrument'];
	return faker.helpers.arrayElement(moduleTypes);
}
