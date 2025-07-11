import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputPath } from '$lib/input/InputPath';

export class SetAutoConnectionInputCommand extends EditorCommand<{
	value: boolean;
	inputPath: InputPath;
}> {
	static name = 'SetAutoConnectionInputCommand';

	previousValue!: boolean;

	execute(graphRegistry: GraphRegistry): void {
		const { value, inputPath } = this.details;
		const node = graphRegistry.nodes.get(inputPath.nodeId);
		this.previousValue = node.isInputAutoConnectedMap[inputPath.inputKey];
		node.isInputAutoConnectedMap[inputPath.inputKey] = value;
	}

	undo(graphRegistry: GraphRegistry): void {
		const { inputPath } = this.details;
		const node = graphRegistry.nodes.get(inputPath.nodeId);
		node.isInputAutoConnectedMap[inputPath.inputKey] = this.previousValue;
	}
}
