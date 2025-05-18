import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InputNodeExtrasData } from '$lib/data/variants/InputNodeExtrasData';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class UpdateInputNodeExtrasCommand extends EditorCommand<{
	nodeId: string;
	extras: Partial<InputNodeExtrasData>;
}> {
	static name = 'UpdateInputNodeExtrasCommand';

	previousValue!: InputNodeExtrasData;

	execute(graphRegistry: GraphRegistry): void {
		const { nodeId, extras } = this.details;
		const node = graphRegistry.nodes.get(nodeId);
		if (node.type !== 'InputNode') {
			throw new Error("Can't change the value of a node with type different than InputNode");
		}
		this.previousValue = structuredClone(node.extras);

		const { default: defaultValue, max, min, name } = extras;
		if (max !== undefined) node.extras.max = max;
		if (min !== undefined) node.extras.min = min;
		if (name !== undefined) node.extras.name = name;
		if (defaultValue !== undefined) node.extras.default = defaultValue;
	}

	undo(graphRegistry: GraphRegistry): void {
		const { nodeId } = this.details;
		const node = graphRegistry.nodes.get(nodeId);
		if (node.type !== 'InputNode') {
			throw new Error("Can't change the value of a node with type different than InputNode");
		}

		node.extras = structuredClone(this.previousValue);
	}
}
