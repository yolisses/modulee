import type { Vector } from '$lib/space/Vector';
import type { Output } from '../output/Output.svelte';
import type { Input } from './Input.svelte';

export type PreviewConnection = {
	input: Input;
	output?: Output;
	dataPointerPosition: Vector;
};
