import type { ConnectionData } from '$lib/connection/ConnectionData';
import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { InputWithControl } from '$lib/input/InputWithControl';
import type { ControlNodeData } from '$lib/node/data/variants/ControlNodeData';
import type { Node } from '$lib/node/Node.svelte';
import { Vector } from 'nodes-editor';

export function addNodeControlNodes(node: Node, graphRegistry: GraphRegistry) {
	node.inputs.forEach((input) => {
		if (input.targetNode) return;
		if (!(input instanceof InputWithControl)) return;

		const controlNodeId = input.getControlNodeId();
		const controlNodeData: ControlNodeData = {
			id: controlNodeId,
			type: 'ControlNode',
			unconnectedInputValues: {},
			position: Vector.zero().getData(),
			internalModuleId: input.node.internalModuleId,
			extras: { value: input.getUnconnectedValue() },
		};
		graphRegistry.nodes.add(controlNodeData);

		const connectionData: ConnectionData = {
			id: createId(),
			inputPath: input.inputPath,
			targetNodeId: controlNodeId,
		};
		graphRegistry.connections.add(connectionData);
	});
}
