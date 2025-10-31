import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { cloneGraphRegistry } from '../cloneGraphRegistry';
import { FlatteningModule } from './FlatteningModule';
import { FlatteningModuleNode } from './FlatteningModuleNode';
import type { FlatteningNode } from './FlatteningNode';
import { getFlatteningModuleNodesInOrder } from './getFlatteningModuleNodesInOrder';

export class FlatteningGraph {
	nodes: FlatteningNode[];

	constructor(public graphRegistry: GraphRegistry) {
		const modules = graphRegistry.internalModules
			.values()
			.map((moduleData) => new FlatteningModule(graphRegistry, moduleData));

		modules.forEach((module) => {
			module.setModuleNodeTargets(modules);
		});

		this.nodes = modules.flatMap((module) => module.nodes);
		const connections = this.nodes.flatMap((node) => node.connections);
		connections.forEach((connection) => connection.setTargetNode(this.nodes));
	}

	flatten(): GraphRegistry {
		const moduleNodesInOrder = getFlatteningModuleNodesInOrder(this.nodes);

		const result = cloneGraphRegistry(this.graphRegistry);
		const stack: FlatteningModuleNode[] = [];
		moduleNodesInOrder.toReversed().forEach((moduleNode) => moduleNode.flatten(result, stack));

		return result;
	}
}
