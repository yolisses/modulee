import { createId } from '$lib/data/createId';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InternalModuleData } from '$lib/data/InternalModuleData';
import { ById } from '$lib/editor/ById';
import { test } from 'vitest';

test('editorMonkey', () => {
	// By now, every graph needs a main internal module. It can be changed
	// latter.
	const mainInternalModule: InternalModuleData = { id: createId(), name: 'Main internal module' };
	const internalModules = new ById<InternalModuleData>();
	internalModules.add(mainInternalModule);

	const graphRegistry: GraphRegistry = {
		connections: new ById(),
		nodes: new ById(),
		externalModuleReferences: new ById(),
		internalModules,
		mainInternalModuleId: mainInternalModule.id,
	};
});
