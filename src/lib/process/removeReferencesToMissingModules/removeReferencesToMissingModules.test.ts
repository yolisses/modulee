import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { expect, test } from 'vitest';
import { removeReferencesToMissingModules } from './removeReferencesToMissingModules';

test('removeConnectionsToMissingModules', () => {
	const graphRegistry = {
		internalModules: ById.fromItems([{ id: 'module1' }, { id: 'module3' }]),
		nodes: ById.fromItems([
			{
				id: 'node1',
				type: 'ModuleNode',
				extras: { moduleReference: { type: 'internal', moduleId: 'module1' } },
			},
			{
				id: 'node2',
				type: 'ModuleNode',
				extras: { moduleReference: { type: 'internal', moduleId: 'module2' } },
			},
			{
				id: 'node3',
				type: 'ModuleVoicesNode',
				extras: { moduleReference: { type: 'internal', moduleId: 'module3' } },
			},
		]),
	} as GraphRegistry;

	removeReferencesToMissingModules(graphRegistry);

	expect(graphRegistry.nodes.values()).toEqual([
		{
			id: 'node1',
			type: 'ModuleNode',
			extras: { moduleReference: { type: 'internal', moduleId: 'module1' } },
		},
		{
			id: 'node2',
			type: 'ModuleNode',
			extras: { moduleReference: undefined },
		},
		{
			id: 'node3',
			type: 'ModuleVoicesNode',
			extras: { moduleReference: { type: 'internal', moduleId: 'module3' } },
		},
	]);
});
