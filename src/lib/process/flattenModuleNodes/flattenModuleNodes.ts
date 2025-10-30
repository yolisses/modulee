import type { ConnectionData } from '$lib/connection/ConnectionData';
import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InternalModuleData } from '$lib/module/internalModule/InternalModuleData';
import type { NodeData } from '$lib/node/data/NodeData';
import type { ModuleNodeData } from '$lib/node/data/variants/ModuleNodeData';

class FlattingConnection {
	constructor(
		public graphRegistry: GraphRegistry,
		public connectionData: ConnectionData,
	) {}

	flatten(result: GraphRegistry) {
		result.connections.add(this.connectionData);
	}
}

class FlattingNode {
	connections: FlattingConnection[];

	constructor(
		public graphRegistry: GraphRegistry,
		public nodeData: NodeData,
	) {
		this.connections = graphRegistry.connections
			.values()
			.filter((connectionData) => connectionData.inputPath.nodeId === nodeData.id)
			.map((connectionData) => new FlattingConnection(graphRegistry, connectionData));
	}

	flatten(result: GraphRegistry) {
		result.nodes.add(this.nodeData);
		this.connections.forEach((connection) => {
			connection.flatten(result);
		});
	}
}

class FlattingModuleNode extends FlattingNode {
	targetModule?: FlattingModule;

	constructor(
		public graphRegistry: GraphRegistry,
		public moduleNodeData: ModuleNodeData,
	) {
		super(graphRegistry, moduleNodeData);
	}

	setTarget(moduleOptions: FlattingModule[]) {
		const moduleId = this.moduleNodeData.extras.moduleReference?.moduleId;
		if (!moduleId) return;
		this.targetModule = moduleOptions.find(
			(moduleOption) => moduleOption.moduleData.id === moduleId,
		);
	}
}

class FlattingModule {
	nodes: FlattingNode[];

	constructor(
		public graphRegistry: GraphRegistry,
		public moduleData: InternalModuleData,
	) {
		this.nodes = graphRegistry.nodes
			.values()
			.filter((nodeData) => nodeData.internalModuleId === moduleData.id)
			.map((nodeData) => {
				if (nodeData.type === 'ModuleNode') {
					return new FlattingModuleNode(graphRegistry, nodeData);
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

	flatten(result: GraphRegistry) {
		this.graphRegistry.internalModules.add(this.moduleData);
		this.nodes.forEach((node) => {
			node.flatten(result);
		});
	}
}

class FlatteningGraph {
	modules: FlattingModule[];

	constructor(public graphRegistry: GraphRegistry) {
		this.modules = graphRegistry.internalModules
			.values()
			.map((moduleData) => new FlattingModule(graphRegistry, moduleData));

		this.modules.forEach((module) => {
			module.setModuleNodeTargets(this.modules);
		});
	}

	flatten(): GraphRegistry {
		const result: GraphRegistry = {
			connections: new ById(),
			externalModules: new ById(),
			internalModules: new ById(),
			mainInternalModuleId: this.graphRegistry.mainInternalModuleId,
			nodes: new ById(),
		};

		this.modules.forEach((module) => {
			module.flatten(result);
		});

		return result;
	}
}

export function flattenModuleNodes(graphRegistry: GraphRegistry) {
	const flatteningGraph = new FlatteningGraph(graphRegistry);
	flatteningGraph.flatten();
}
