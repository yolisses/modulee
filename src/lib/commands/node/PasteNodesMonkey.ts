import { createId } from '$lib/data/createId';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { getRandomDistinctItems } from '$lib/fake/getRandomDistinctItems';
import { getRandomInt } from '$lib/fake/getRandomInt';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { getId } from '$lib/ui/getId';
import { PasteNodesCommand } from './PasteNodesCommand';
import { setNewId } from './setNewId';

export class PasteNodesMonkey extends EditorMonkey {
	getCanBeUsed(graphRegistry: GraphRegistry): boolean {
		return graphRegistry.nodes.values().length > 0;
	}

	createCommand(graphRegistry: GraphRegistry) {
		const nodeOptions = graphRegistry.nodes.values();
		const nodes = structuredClone(
			getRandomDistinctItems(nodeOptions, getRandomInt(1, nodeOptions.length)),
		);
		const nodeIds = new Set(nodes.map(getId));
		const connections = structuredClone(
			graphRegistry.connections.values().filter((connection) => {
				return nodeIds.has(connection.targetNodeId) && nodeIds.has(connection.inputPath.nodeId);
			}),
		);
		nodes.forEach(setNewId);
		connections.forEach(setNewId);
		return new PasteNodesCommand({
			id: createId(),
			type: 'PasteNodeCommand',
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
			details: { nodes, connections },
		});
	}
}
