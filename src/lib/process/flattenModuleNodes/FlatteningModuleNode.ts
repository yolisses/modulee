import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { ModuleNodeData } from '$lib/node/data/variants/ModuleNodeData';
import { FlatteningInputNode } from './FlatteningInputNode';
import { FlatteningModule } from './FlatteningModule';
import { FlatteningNode } from './FlatteningNode';
import { FlatteningOutputNode } from './FlatteningOutputNode';

export class FlatteningModuleNode extends FlatteningNode {
	targetModule?: FlatteningModule;

	constructor(
		graphRegistry: GraphRegistry,
		public moduleNodeData: ModuleNodeData,
	) {
		super(graphRegistry, moduleNodeData);
	}

	flatten(result: GraphRegistry, stack: FlatteningModuleNode[]) {
		this.targetModule?.flatten(result, [...stack, this]);
		result.nodes.remove(this.nodeData);
		if (!this.getModuleOutputNode()) {
			this.createPlaceholder(result, stack, this.nodeData);
		}

		// Remove connections from inputs
		result.connections.removeByCondition((connection) => {
			return connection.inputPath.nodeId === this.nodeData.id;
		});

		// Redirect to output
		result.connections.values().forEach((connection) => {
			if (connection.targetNodeId === this.nodeData.id) {
				connection.targetNodeId = this.getIdForConnectionTarget(stack);
			}
		});
	}

	setTarget(moduleOptions: FlatteningModule[]) {
		const moduleId = this.moduleNodeData.extras.moduleReference?.moduleId;
		if (!moduleId) return;
		this.targetModule = moduleOptions.find(
			(moduleOption) => moduleOption.moduleData.id === moduleId,
		);
	}

	getModuleOutputNode() {
		return this.targetModule?.nodes.find((node) => node instanceof FlatteningOutputNode);
	}

	getIdForConnectionTarget(stack: FlatteningModuleNode[]) {
		const moduleOutputNode = this.getModuleOutputNode();

		if (moduleOutputNode && this.targetModule) {
			return moduleOutputNode.getIdForConnectionTarget([...stack, this]);
		}

		return this.moduleNodeData.id + '_placeholder';
	}

	getTargetForInputNode(inputNode: FlatteningInputNode) {
		return this.connections.find(
			(connection) => connection.connectionData.inputPath.inputKey === inputNode.inputNodeData.id,
		)?.targetNode;
	}
}
