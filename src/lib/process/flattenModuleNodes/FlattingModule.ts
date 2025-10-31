import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InternalModuleData } from '$lib/module/internalModule/InternalModuleData';
import { FlattingInputNode } from './FlattingInputNode';
import { FlattingModuleNode } from './FlattingModuleNode';
import { FlattingNode } from './FlattingNode';
import { FlattingOutputNode } from './FlattingOutputNode';

export class FlattingModule {
	nodes: FlattingNode[];

	constructor(
		graphRegistry: GraphRegistry,
		public moduleData: InternalModuleData,
	) {
		this.nodes = graphRegistry.nodes
			.values()
			.filter((nodeData) => nodeData.internalModuleId === moduleData.id)
			.map((nodeData) => {
				if (nodeData.type === 'ModuleNode') {
					return new FlattingModuleNode(graphRegistry, nodeData);
				} else if (nodeData.type === 'OutputNode') {
					return new FlattingOutputNode(graphRegistry, nodeData);
				} else if (nodeData.type === 'InputNode') {
					return new FlattingInputNode(graphRegistry, nodeData);
				} else {
					return new FlattingNode(graphRegistry, nodeData);
				}
			});
	}

	setModuleNodeTargets(moduleOptions: FlattingModule[]) {
		this.nodes.forEach((node) => {
			if (node instanceof FlattingModuleNode) {
				node.setTarget(moduleOptions);
			}
		});
	}

	flatten(result: GraphRegistry, stack: FlattingModuleNode[]) {
		this.nodes.forEach((node) => {
			if (stack.length === 0) {
				if (node instanceof FlattingModuleNode) {
					node.flatten(result, stack);
				}
			} else {
				node.flatten(result, stack);
			}
		});
	}
}
