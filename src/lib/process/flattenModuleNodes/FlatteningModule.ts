import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InternalModuleData } from '$lib/module/internalModule/InternalModuleData';
import { FlatteningInputNode } from './FlatteningInputNode';
import { FlatteningModuleNode } from './FlatteningModuleNode';
import { FlatteningNode } from './FlatteningNode';
import { FlatteningOutputNode } from './FlatteningOutputNode';

export class FlatteningModule {
	nodes: FlatteningNode[];

	constructor(
		graphRegistry: GraphRegistry,
		public moduleData: InternalModuleData,
	) {
		this.nodes = graphRegistry.nodes
			.values()
			.filter((nodeData) => nodeData.internalModuleId === moduleData.id)
			.map((nodeData) => {
				if (nodeData.type === 'ModuleNode') {
					return new FlatteningModuleNode(graphRegistry, nodeData);
				} else if (nodeData.type === 'OutputNode') {
					return new FlatteningOutputNode(graphRegistry, nodeData);
				} else if (nodeData.type === 'InputNode') {
					return new FlatteningInputNode(graphRegistry, nodeData);
				} else {
					return new FlatteningNode(graphRegistry, nodeData);
				}
			});
	}

	setModuleNodeTargets(moduleOptions: FlatteningModule[]) {
		this.nodes.forEach((node) => {
			if (node instanceof FlatteningModuleNode) {
				node.setTarget(moduleOptions);
			}
		});
	}

	flatten(result: GraphRegistry, stack: FlatteningModuleNode[]) {
		this.nodes.forEach((node) => {
			node.flatten(result, stack);
		});
	}
}
