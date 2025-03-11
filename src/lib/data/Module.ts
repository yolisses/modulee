import type { Node } from './Node.svelte';

export interface Module {
	id: string;
	name: string;
	nodes: Node[];
}
