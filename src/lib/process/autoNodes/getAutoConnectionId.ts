import { getInputPathId } from '$lib/connection/getInputPathId';
import type { InputPath } from '$lib/input/InputPath';

export function getAutoConnectionId(inputPath: InputPath) {
	return 'auto_connection_for_input_path_' + getInputPathId(inputPath);
}
