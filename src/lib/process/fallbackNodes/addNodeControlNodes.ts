import type { ConnectionData } from '$lib/data/ConnectionData';
import { createId } from '$lib/data/createId';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { InputWithControl } from '$lib/data/InputWithControl';
import type { Node } from '$lib/data/Node.svelte';
import type { ControlNodeData } from '$lib/data/variants/ControlNodeData';
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
