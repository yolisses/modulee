import { EditorCommand } from '$lib/editor/EditorCommand';
import type { EmptyObject } from '$lib/editor/EmptyObject';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { getOrganizingNodeWithType } from '$lib/graph/organize/getOrganizingNode';
import { getTopologicalNode } from '$lib/graph/organize/getTopologicalNode';
import { organizeNodes } from '$lib/graph/organize/organizeNodes';
import { topologicalSort } from '$lib/graph/organize/topologicalSort';
import type { VectorData } from '$lib/node/actionCommands/VectorData';
import type { NodeData } from '$lib/node/data/NodeData';
import { NODE_ITEM_GAP } from '$lib/node/NODE_ITEM_GAP';
import { NODE_ITEM_WIDTH } from '$lib/node/NODE_ITEM_WIDTH';

export class OrganizeNodesCommand extends EditorCommand<EmptyObject> {
	static name = 'OrganizeNodesCommand';

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

		nodesByInternalModuleId.forEach((nodes) => {
			nodes = topologicalSort(nodes.map((node) => getTopologicalNode(node, graphRegistry))).map(
				(id) => graphRegistry.nodes.get(id),
			);
			const organizeingNodes = nodes.map((nodeData) =>
				getOrganizingNodeWithType(nodeData, graphRegistry),
			);
			const positions = organizeNodes(organizeingNodes, NODE_ITEM_WIDTH, NODE_ITEM_GAP);
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
