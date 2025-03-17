import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import type { ExternalModuleReference } from './ExternalModuleReference';
import type { Module } from './Module';
import { Node } from './Node.svelte';

export class ExternalModule implements Module {
	public nodes: Node[];
	protected externalModuleData: ExternalModuleData;

	constructor(externalModuleData: ExternalModuleData) {
		this.externalModuleData = structuredClone(externalModuleData);
		Object.freeze(this.externalModuleData);

		this.nodes = this.getNodes();
	}

	getNodes() {
		return this.externalModuleData.graph.nodes.map((nodeData) => {
			return new Node(nodeData);
		});
	}

	getReference(): ExternalModuleReference {
		return { id: this.id, type: 'external', version: this.version };
	}

	get id() {
		return this.externalModuleData.id;
	}

	get name() {
		return this.externalModuleData.name;
	}

	get version() {
		return this.externalModuleData.version;
	}
}
