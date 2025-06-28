import type { ById } from '$lib/editor/ById';
import type { InternalModuleData } from './InternalModuleData';
import type { InternalModuleReference } from './InternalModuleReference';
import { Module } from './Module';
import type { Node } from './Node.svelte';

export class InternalModule extends Module<InternalModuleData> {
	constructor(internalModuleData: InternalModuleData, nodeOptions: ById<Node>) {
		super(internalModuleData);

		this.nodes = nodeOptions.values().filter((node) => node.internalModuleId === this.id);
	}

	// This value is overridden in the constructor
	getNodes(): Node[] {
		return [];
	}

	getReference(): InternalModuleReference {
		return { moduleId: this.id, type: 'internal' };
	}
}
