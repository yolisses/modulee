import type { Input } from '$lib/input/Input';
import type { Vector } from 'nodes-editor';
import type { Output } from '../Output';

export type AddNodeMenuParams = {
	input?: Input;
	output?: Output;
	position: Vector;
};
