import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { UseEffectCommand } from './UseEffectCommand';
import type { ConnectionData } from '$lib/data/ConnectionData';

test('UseEffectCommand', () => {
	const graphRegistry = {
		nodes: ById.fromItems([
			{
				id: 'outputNodeId',
				type: 'OutputNode',
				position: { x: 0, y: 0 },
				internalModuleId: 'internalModuleId',
			},
		]),
		connections: ById.fromItems<ConnectionData>([]),
	} as GraphRegistry;

	const externalModuleData = {
		id: 'externalModuleId',
		graph: {
			nodes: [
				{ id: 'audioInputNode1Id', type: 'AudioInputNode' },
				{ id: 'audioInputNode2Id', type: 'AudioInputNode' },
			],
		},
	} as ExternalModuleData;
	const command = new UseEffectCommand(
		mockCommandData({
			outputNodeId: 'outputNodeId',
			moduleNodeId: 'moduleNodeId',
			externalModule: externalModuleData,
			connectionId: 'outputAndModuleNodeConnectionId',
			audioInputConnectionIds: {
				audioInputNode1Id: 'audioInputNodeConnection1Id',
				audioInputNode2Id: 'audioInputNodeConnection2Id',
			},
		}),
	);

	command.execute(graphRegistry);

	// 1. Move the output node to add space to the effect module node.
	expect(graphRegistry.nodes.get('outputNodeId').position).toEqual({ x: 7, y: 0 });

	// 2. Add the module node with the effect external module refference.
	expect(graphRegistry.nodes.get('moduleNodeId')).toEqual({
		id: 'moduleNodeId',
		type: 'ModuleNode',
		position: { x: 0, y: 0 },
		unconnectedInputValues: {},
		internalModuleId: 'internalModuleId',
		extras: { moduleReference: { type: 'external', id: 'externalModuleId' } },
	});

	// 3. Connect the audio input nodes from the effect module node to the node
	//    connected to the output node input if exists.
	expect(graphRegistry.connections.get('audioInputNodeConnection1Id')).toEqual({
		targetNodeId: 'outputNodeId',
		id: 'audioInputNodeConnection1Id',
		inputPath: { nodeId: 'moduleNodeId', inputKey: 'audioInputNode1Id' },
	});
	expect(graphRegistry.connections.get('audioInputNodeConnection2Id')).toEqual({
		targetNodeId: 'outputNodeId',
		id: 'audioInputNodeConnection2Id',
		inputPath: { nodeId: 'moduleNodeId', inputKey: 'audioInputNode2Id' },
	});

	// 4. Connect the output node to the effect module node.
	expect(graphRegistry.connections.get('outputAndModuleNodeConnectionId')).toEqual({
		targetNodeId: 'moduleNodeId',
		id: 'outputAndModuleNodeConnectionId',
		inputPath: { nodeId: 'outputNodeId', inputKey: 'input' },
	});
});
