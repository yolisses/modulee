import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputPath } from '$lib/input/InputPath';

export class SetUnconnectedInputValueCommand extends EditorCommand<{
	value: number;
	inputPath: InputPath;
}> {
	static name = 'SetUnconnectedInputValueCommand';

	previousValue!: number;

	execute(graphRegistry: GraphRegistry): void {
		const { value, inputPath } = this.details;
		const node = graphRegistry.nodes.get(inputPath.nodeId);
		this.previousValue = node.unconnectedInputValues[inputPath.inputKey];
		node.unconnectedInputValues[inputPath.inputKey] = value;
	}

	undo(graphRegistry: GraphRegistry): void {
		const { inputPath } = this.details;
		const node = graphRegistry.nodes.get(inputPath.nodeId);
		node.unconnectedInputValues[inputPath.inputKey] = this.previousValue;
	}
}
