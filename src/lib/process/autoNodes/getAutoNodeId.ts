import { getInputPathId } from '$lib/connection/getInputPathId';
import type { InputPath } from '$lib/input/InputPath';

export function getAutoNodeId(inputPath: InputPath) {
	return 'auto_node_for_input_path_' + getInputPathId(inputPath);
}
