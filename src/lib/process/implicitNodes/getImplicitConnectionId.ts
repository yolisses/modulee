import { getInputPathId } from '$lib/connection/getInputPathId';
import type { InputPath } from '$lib/input/InputPath';

export function getImplicitConnectionId(inputPath: InputPath) {
	return 'implicit_connection_for_input_path_' + getInputPathId(inputPath);
}
