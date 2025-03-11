import { getVersionString } from '$lib/import/getVersionString';
import type { ExternalModuleData } from '$lib/module/ExternalModuleData';
import type { Version } from '$lib/module/Version';
import type { ExternalModuleReference } from './ExternalModuleReference';
import type { Module } from './Module';
import type { Node } from './Node.svelte';

export class ExternalModule implements Module {
	public id: string;
	public name: string;
	public nodes: Node[];
	public version: Version;

	constructor(
		externalModuleReference: ExternalModuleReference,
		externalModuleDataOptions: ExternalModuleData[],
	) {
		const { id, version } = externalModuleReference;
		const externalModule = externalModuleDataOptions.find((externalModuleData) => {
			return externalModuleData.id === id && externalModuleData.version === version;
		});
		if (!externalModule) {
			throw new Error(`External module not found for id ${id} and version ${version}`);
		}

		this.name = externalModule.name;
		this.version = externalModule.version;
		this.id = externalModule.id + getVersionString(externalModule.version);
	}
}
