import type { ModuleDataBase } from './ModuleDataBase';
import type { ModuleReference } from './ModuleReference';
import type { Node } from './Node.svelte';

export abstract class Module<T extends ModuleDataBase = ModuleDataBase> {
	nodes!: Node[];
	protected moduleData: T;
	abstract getReference(): ModuleReference;

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
