import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { Input } from '$lib/data/Input.svelte';
import type { Node } from '$lib/data/Node.svelte';
import type { ControlNodeData } from '$lib/data/variants/ControlNodeData';
import { Vector } from 'nodes-editor';

export function addNodeControlNodes(node: Node, graphRegistry: GraphRegistry) {
	node.inputs.forEach((input) => {
		if (input.targetNode) return;
		const inputControlNodeData = createInputControlNode(input);
		graphRegistry.nodes.add(inputControlNodeData);
	});
}

function createInputControlNode(input: Input): ControlNodeData {
	return {
		type: 'ControlNode',
		unconnectedInputValues: {},
		id: input.getControlNodeId(),
		position: Vector.zero().getData(),
		extras: { value: input.unconnectedValue },
		internalModuleId: input.node.internalModuleId,
	};
}
