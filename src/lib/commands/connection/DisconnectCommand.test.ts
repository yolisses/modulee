import type { ConnectionData } from '$lib/data/ConnectionData';
import type { GraphData } from '$lib/data/GraphData';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { DisconnectCommand } from './DisconnectCommand';

test('DisconnectCommand', () => {
	const graphData = {
		connections: ById.fromItems([
			{ id: 'connection2', inputPath: { nodeId: 'node2', inputName: 'input2' } },
		] as ConnectionData[]),
	} as GraphData;

	const command = new DisconnectCommand(
		mockCommandData({ inputPath: { nodeId: 'node2', inputName: 'input2' } }),
	);

	command.execute(graphData);

	expect(graphData.connections.containsId('connection2')).toEqual(false);

	command.undo(graphData);

	expect(graphData.connections.containsId('connection2')).toEqual(true);
});
