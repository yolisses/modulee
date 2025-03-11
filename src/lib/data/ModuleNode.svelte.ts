import type { ById } from '$lib/editor/ById';
import { getVersionString } from '$lib/import/getVersionString';
import type { ExternalModule } from './ExternalModule';
import { Input } from './Input.svelte';
import { InputNode } from './InputNode.svelte';
import type { InternalModule } from './InternalModule.svelte';
import type { Module } from './Module';
import type { ModuleReference } from './ModuleReference';
import { Node } from './Node.svelte';
import type { ModuleNodeData } from './variants/ModuleNodeData';
import type { ModuleNodeExtrasData } from './variants/ModuleNodeExtrasData';
import type { ModuleVoicesNodeData } from './variants/ModuleVoicesNodeData';

// A internal module valued node should be created with a internal module, but a
// internal module should be created with node options. To solve this cyclic
// dependency, the ModuleNode is created without module, and then have
// fillModule called
export class ModuleNode extends Node {
	declare extras: ModuleNodeExtrasData;
	module: Module | null = $state(null);
	moduleReference: ModuleReference | null = null;

	constructor(nodeData: ModuleNodeData | ModuleVoicesNodeData) {
		super(nodeData);
		const { moduleReference } = nodeData.extras;
		this.moduleReference = moduleReference;
	}

	fillModule(internalModules: ById<InternalModule>, externalModules: ById<ExternalModule>) {
		if (this.moduleReference) {
			if (this.moduleReference.type === 'internal') {
				this.module = internalModules.getOrNull(this.moduleReference.id);
			} else {
				this.module = externalModules.getOrNull(
					this.moduleReference.id + getVersionString(this.moduleReference.version),
				);
			}
		} else {
			this.module = null;
		}
		this.updateInputs();
	}

	getInputNodes() {
		if (!this.module) return [];
		return this.module.nodes.filter((node) => {
			return node instanceof InputNode;
		});
	}

	// Uses a different name to prevent if from being called in super
	updateInputs() {
		this.inputs = [];
		const inputNodes = this.getInputNodes();
		inputNodes.forEach((inputNode) => {
			const input = new Input(inputNode.id, inputNode.extras.name, this);
			this.inputs.push(input);
		});
	}
}
