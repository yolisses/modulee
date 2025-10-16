import type { ById } from '$lib/editor/ById';
import type { Node } from '$lib/node/Node.svelte';
import { Module } from '../Module';
import type { InternalModuleData } from './InternalModuleData';
import type { InternalModuleReference } from './InternalModuleReference';

export class InternalModule extends Module<InternalModuleData> {
	constructor(internalModuleData: InternalModuleData, nodeOptions: ById<Node>) {
		super(internalModuleData);

		this.nodes = nodeOptions.values().filter((node) => node.internalModuleId === this.id);
	}

	getReference(): InternalModuleReference {
		return { moduleId: this.id, type: 'internal' };
	}
}
