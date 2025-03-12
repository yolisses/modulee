import type { ById } from '$lib/editor/ById';
import type { InternalModuleData } from './InternalModuleData';
import type { InternalModuleReference } from './InternalModuleReference';
import type { Module } from './Module';
import type { Node } from './Node.svelte';

// TODO check if it makes sense to keep data as a froze object instead of
// copying its values
export class InternalModule implements Module {
	id: string;
	name: string;
	nodes!: Node[];

	constructor(internalModuleData: InternalModuleData, nodeOptions: ById<Node>) {
		const { id, name } = internalModuleData;
		this.id = id;
		this.name = name;

		this.nodes = nodeOptions.values().filter((node) => node.internalModuleId === this.id);
	}

	getReference(): InternalModuleReference {
		return { id: this.id, type: 'internal' };
	}
}
