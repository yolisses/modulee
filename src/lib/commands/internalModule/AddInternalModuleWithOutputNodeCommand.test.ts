import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InternalModuleData } from '$lib/module/internalModule/InternalModuleData';
import type { NodeData } from '$lib/node/data/NodeData';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { AddInternalModuleWithOutputNodeCommand } from './AddInternalModuleWithOutputNodeCommand';

test('AddInternalModuleWithOutputNodeCommand', () => {
	const graphRegistry = {
		internalModules: ById.fromItems([{ id: 'internalModule1' }]),
		nodes: ById.fromItems([{ id: 'node1' }]),
	} as GraphRegistry;

	const command = new AddInternalModuleWithOutputNodeCommand(
		mockCommandData({
			internalModule: { id: 'internalModule2' } as InternalModuleData,
			node: { id: 'node2' } as NodeData,
		}),
	);
	command.execute(graphRegistry);

	expect(graphRegistry.internalModules.values()).toEqual([
		{ id: 'internalModule1' },
		{ id: 'internalModule2' },
	]);
	expect(graphRegistry.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }]);

	command.undo(graphRegistry);

	expect(graphRegistry.internalModules.values()).toEqual([{ id: 'internalModule1' }]);
	expect(graphRegistry.nodes.values()).toEqual([{ id: 'node1' }]);
});
