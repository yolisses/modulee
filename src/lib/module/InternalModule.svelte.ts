import type { ById } from '$lib/editor/ById';
import { Module } from '../data/Module';
import type { Node } from '../node/Node.svelte';
import type { InternalModuleData } from './internalModule/InternalModuleData';
import type { InternalModuleReference } from './internalModule/InternalModuleReference';

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
