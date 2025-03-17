import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import type { ExternalModuleReference } from './ExternalModuleReference';
import { Module } from './Module';
import { Node } from './Node.svelte';

export class ExternalModule extends Module<ExternalModuleData> {
	constructor(externalModuleData: ExternalModuleData) {
		super(externalModuleData);

		this.nodes = this.getNodes();
	}

	getNodes() {
		return this.moduleData.graph.nodes.map((nodeData) => {
			return new Node(nodeData);
		});
	}

	getReference(): ExternalModuleReference {
		return { id: this.id, type: 'external', version: this.version };
	}

	get version() {
		return this.moduleData.version;
	}
}
