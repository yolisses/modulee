import type { ById } from '$lib/editor/ById';
import { AudioInputNode } from './AudioInputNode.svelte';
import { InputNode } from './InputNode.svelte';
import type { Module } from './Module';
import { ModuleNodeInput } from './ModuleNodeInput';
import { Node } from './Node.svelte';
import type { ModuleNodeData } from './variants/ModuleNodeData';
import type { ModuleVoicesNodeData } from './variants/ModuleVoicesNodeData';

// A internal module valued node should be created with a internal module, but a
// internal module should be created with node options. To solve this cyclic
// dependency, the ModuleNode is created without module, and then have
// fillModule called
export class ModuleNode extends Node<ModuleNodeData | ModuleVoicesNodeData> {
	targetModule: Module | null = $state(null);

	fillModule(modules: ById<Module>) {
		if (this.moduleReference) {
			this.targetModule = modules.getOrNull(this.moduleReference.id);
		} else {
			this.targetModule = null;
		}
		this.updateInputs();
	}

	getInputNodes() {
		if (!this.targetModule) return [];
		return this.targetModule.nodes.filter((node) => {
			return node instanceof InputNode || node instanceof AudioInputNode;
		});
	}

	// Uses a different name to prevent if from being called in super
	updateInputs() {
		this.inputs = [];
		const inputNodes = this.getInputNodes();
		console.log(inputNodes);
		inputNodes.forEach((inputNode) => {
			const input = new ModuleNodeInput(this, inputNode);
			this.inputs.push(input);
		});
	}

	get moduleReference() {
		return this.nodeData.extras.moduleReference;
	}
}
