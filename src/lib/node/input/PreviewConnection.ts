import type { Vector } from '$lib/space/Vector';
import type { Input } from './Input.svelte';

export type PreviewConnection = {
	dataPointerPosition: Vector;
	startInput: Input;
	finalInput?: Input;
};
