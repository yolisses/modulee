import { EditorCommand } from '$lib/editor/EditorCommand';
import type { EmptyObject } from '$lib/editor/EmptyObject';
import { formatNodes } from '$lib/graph/format/formatNodes';
import { getFormatingNodeWithType } from '$lib/graph/format/getFormatingNode';
import { getTopologicalNode } from '$lib/graph/format/getTopologicalNode';
import { topologicalSort } from '$lib/graph/format/topologicalSort';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { VectorData } from '$lib/node/actionCommands/VectorData';
import type { NodeData } from '$lib/node/data/NodeData';
import { NODE_ITEM_GAP } from '$lib/node/NODE_ITEM_GAP';
import { NODE_ITEM_WIDTH_PLUS_GAP } from '$lib/node/NODE_ITEM_WIDTH_PLUS_GAP';

export class FormatNodesCommand extends EditorCommand<EmptyObject> {
	static name = 'FormatNodesCommand';

	previousPositions!: Map<string, VectorData>;

	execute(graphRegistry: GraphRegistry): void {
		this.previousPositions = new Map();
		const nodesByInternalModuleId = new Map<string, NodeData[]>();

		graphRegistry.nodes.values().forEach((nodeData) => {
			const { internalModuleId, id, position } = nodeData;
			this.previousPositions.set(id, position);

			if (!nodesByInternalModuleId.has(internalModuleId)) {
				nodesByInternalModuleId.set(internalModuleId, []);
			}
			nodesByInternalModuleId.get(internalModuleId)!.push(nodeData);
		});

		const xStep = -NODE_ITEM_WIDTH_PLUS_GAP;
		nodesByInternalModuleId.forEach((nodes) => {
			nodes = topologicalSort(nodes.map((node) => getTopologicalNode(node, graphRegistry))).map(
				(id) => graphRegistry.nodes.get(id),
			);
			const formatingNodes = nodes.map((nodeData) =>
				getFormatingNodeWithType(nodeData, graphRegistry),
			);
			const positions = formatNodes(formatingNodes, xStep, NODE_ITEM_GAP);
			positions.entries().forEach(([node, position]) => {
				graphRegistry.nodes.get(node.id).position = position.getData();
			});
		});
	}

	undo(graphRegistry: GraphRegistry): void {
		this.previousPositions.entries().forEach(([id, position]) => {
			graphRegistry.nodes.get(id).position = position;
		});
	}
}
