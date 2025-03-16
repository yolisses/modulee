import { getVersionString } from '$lib/import/getVersionString';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import type { Version } from '$lib/module/externalModule/Version';
import type { ExternalModuleReference } from './ExternalModuleReference';
import { getAreVersionsEquals } from './getAreVersionsEquals';
import type { Module } from './Module';
import { Node } from './Node.svelte';

export class ExternalModule implements Module {
	public id: string;
	public name: string;
	public nodes: Node[];
	public version: Version;

	constructor(
		externalModuleReference: ExternalModuleReference,
		externalModuleDataOptions: ExternalModuleData[],
	) {
		// TODO remove version checking since id uniquely identifies an external
		// module. The version checking was created to allow updating the
		// external module, which looks like a completely separated feature.
		const { id, version } = externalModuleReference;
		const externalModule = externalModuleDataOptions.find((externalModuleData) => {
			return (
				externalModuleData.id === id && getAreVersionsEquals(externalModuleData.version, version)
			);
		});

		if (!externalModule) {
			throw new Error(
				`External module not found for id ${id} and version ${getVersionString(version)}`,
			);
		}

		this.id = externalModule.id;
		this.name = externalModule.name;
		this.version = externalModule.version;

		this.nodes = externalModule.graph.nodes.map((nodeData) => {
			return new Node(nodeData);
		});
	}

	getReference(): ExternalModuleReference {
		return { id: this.id, type: 'external', version: this.version };
	}
}
