import type { Node } from '../node/Node.svelte';
import type { ModuleDataBase } from './ModuleDataBase';
import type { ModuleReference } from './ModuleReference';

export abstract class Module<T extends ModuleDataBase = ModuleDataBase> {
	nodes!: Node[];
	abstract getReference(): ModuleReference;
	protected moduleData: T;

	constructor(moduleData: T) {
		this.moduleData = structuredClone(moduleData);
		Object.freeze(this.moduleData);
	}

	get id() {
		return this.moduleData.id;
	}

	get name() {
		return this.moduleData.name;
	}
}
