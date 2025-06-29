import type { ById } from '$lib/editor/ById';
import { ModuleNodeAudioInput } from '$lib/input/ModuleNodeAudioInput';
import { ModuleNodeInput } from '$lib/input/ModuleNodeInput';
import type { Module } from '$lib/module/Module';
import type { ModuleNodeData } from './data/variants/ModuleNodeData';
import type { ModuleVoicesNodeData } from './data/variants/ModuleVoicesNodeData';
import { getIsAudioInputNode } from './getIsAudioInputNode';
import { getIsInputNode } from './getIsInputNode';
import { Node } from './Node.svelte';

// A internal module valued node should be created with a internal module, but a
// internal module should be created with node options. To solve this cyclic
// dependency, the ModuleNode is created without module, and then have
// fillModule called
export class ModuleNode extends Node<ModuleNodeData | ModuleVoicesNodeData> {
	targetModule: Module | null = $state(null);

	fillModule(modules: ById<Module>) {
		if (this.moduleReference) {
			this.targetModule = modules.getOrNull(this.moduleReference.moduleId);
		} else {
			this.targetModule = null;
		}
		this.updateInputs();
	}

	// Uses a different name to prevent if from being called in super
	updateInputs() {
		this.inputs = [];

		const { targetModule } = this;
		if (!targetModule) return;

		if (targetModule.nodes.some(getIsAudioInputNode)) {
			this.inputs.push(new ModuleNodeAudioInput(this));
		}

		targetModule.nodes.filter(getIsInputNode).forEach((inputNode) => {
			const input = new ModuleNodeInput(this, inputNode);
			this.inputs.push(input);
		});
	}

	get moduleReference() {
		return this.nodeData.extras.moduleReference;
	}
}
