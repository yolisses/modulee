import { getInputPathId } from '$lib/connection/getInputPathId';
import type { InputPath } from '$lib/input/InputPath';

export function getImplicitNodeId(inputPath: InputPath) {
	return 'implicit_node_for_input_path_' + getInputPathId(inputPath);
}
