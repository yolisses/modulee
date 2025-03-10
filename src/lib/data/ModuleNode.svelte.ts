import type { ById } from '$lib/editor/ById';
import { Input } from './Input.svelte';
import { InputNode } from './InputNode.svelte';
import type { InternalModule } from './InternalModule.svelte';
import { Node } from './Node.svelte';
import type { ModuleNodeData } from './variants/ModuleNodeData';
import type { ModuleNodeExtrasData } from './variants/ModuleNodeExtrasData';
import type { ModuleVoicesNodeData } from './variants/ModuleVoicesNodeData';

// A internalModule node should be created with a internalModule, but a
// internalModule should be created with node options. To solve this cyclic
// dependency, the ModuleNode is created without internalModule, and the
// have updateInternalModule called
export class ModuleNode extends Node {
	declare extras: ModuleNodeExtrasData;
	targetInternalModuleId: string | null = null;
	targetInternalModule: InternalModule | null = $state(null);

	constructor(nodeData: ModuleNodeData | ModuleVoicesNodeData) {
		super(nodeData);
		const { moduleReference: targetInternalModuleId } = nodeData.extras;
		if (
			typeof targetInternalModuleId === 'string' ||
			typeof targetInternalModuleId === 'undefined'
		) {
			this.targetInternalModuleId = targetInternalModuleId;
		} else {
			throw new Error(
				'Invalid type for targetInternalModuleId. Received: ' + targetInternalModuleId,
			);
		}
	}

	updateInternalModule(internalModules: ById<InternalModule>) {
		if (this.targetInternalModuleId) {
			this.targetInternalModule = internalModules.getOrNull(this.targetInternalModuleId);
		} else {
			this.targetInternalModule = null;
		}
		this.updateInputs();
	}

	getInputNodes() {
		if (!this.targetInternalModule) return [];
		return this.targetInternalModule.nodes.filter((node) => {
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
