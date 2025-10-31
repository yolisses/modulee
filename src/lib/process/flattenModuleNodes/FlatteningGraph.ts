import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { cloneGraphRegistry } from '../cloneGraphRegistry';
import { FlatteningModule } from './FlatteningModule';

export class FlatteningGraph {
	modules: FlatteningModule[];

	constructor(public graphRegistry: GraphRegistry) {
		this.modules = graphRegistry.internalModules
			.values()
			.map((moduleData) => new FlatteningModule(graphRegistry, moduleData));

		this.modules.forEach((module) => {
			module.setModuleNodeTargets(this.modules);
		});

		const nodes = this.modules.flatMap((module) => module.nodes);
		const connections = nodes.flatMap((node) => node.connections);
		connections.forEach((connection) => connection.setTargetNode(nodes));
	}

	flatten(): GraphRegistry {
		const result = cloneGraphRegistry(this.graphRegistry);

		this.modules.forEach((module) => {
			module.flatten(result, []);
		});

		return result;
	}
}
