import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import type { ExternalModuleReference } from './ExternalModuleReference';
import { instantiateNode } from './instantiateNode';
import { Module } from './Module';

export class ExternalModule extends Module<ExternalModuleData> {
	constructor(externalModuleData: ExternalModuleData) {
		super(externalModuleData);

		this.nodes = this.getNodes();
	}

	getNodes() {
		return this.moduleData.graph.nodes.map((nodeData) => {
			return instantiateNode(nodeData);
		});
	}

	getReference(): ExternalModuleReference {
		return { id: this.id, type: 'external' };
	}
}
