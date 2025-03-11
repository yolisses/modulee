import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InternalModuleData } from '$lib/data/InternalModuleData';
import type { ModuleNodeData } from '$lib/data/variants/ModuleNodeData';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { GroupNodesCommand } from './GroupNodesCommand';

test('GroupNodesCommand', () => {
	const graphRegistry = {
		internalModules: ById.fromItems([{ id: 'internalModule1' }]),
		nodes: ById.fromItems([
			{ id: 'node1', internalModuleId: 'internalModule1' },
			{ id: 'node2', internalModuleId: 'internalModule1' },
			{ id: 'node3', internalModuleId: 'internalModule1' },
		]),
	} as GraphRegistry;

	const command = new GroupNodesCommand(
		mockCommandData({
			nodesId: ['node1', 'node2'],
			internalModule: { id: 'internalModule2' } as InternalModuleData,
			moduleNodeData: {
				id: 'node4',
				type: 'ModuleNode',
				internalModuleId: 'internalModule1',
				extras: { moduleReference: { type: 'internal', id: 'internalModule2' } },
			} as ModuleNodeData,
		}),
	);
	command.execute(graphRegistry);

	expect(graphRegistry.internalModules.values()).toEqual([
		{ id: 'internalModule1' },
		{ id: 'internalModule2' },
	]);
	expect(graphRegistry.nodes.values()).toEqual([
		{ id: 'node1', internalModuleId: 'internalModule2' },
		{ id: 'node2', internalModuleId: 'internalModule2' },
		{ id: 'node3', internalModuleId: 'internalModule1' },
		{
			id: 'node4',
			type: 'ModuleNode',
			internalModuleId: 'internalModule1',
			extras: { moduleReference: { type: 'internal', id: 'internalModule2' } },
		},
	]);

	command.undo(graphRegistry);

	expect(graphRegistry.internalModules.values()).toEqual([{ id: 'internalModule1' }]);
	expect(graphRegistry.nodes.values()).toEqual([
		{ id: 'node1', internalModuleId: 'internalModule1' },
		{ id: 'node2', internalModuleId: 'internalModule1' },
		{ id: 'node3', internalModuleId: 'internalModule1' },
	]);
});
