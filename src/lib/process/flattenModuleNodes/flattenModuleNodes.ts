import type { ConnectionData } from '$lib/connection/ConnectionData';
import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InternalModuleData } from '$lib/module/internalModule/InternalModuleData';
import type { NodeData } from '$lib/node/data/NodeData';
import type { ModuleNodeData } from '$lib/node/data/variants/ModuleNodeData';
import { cloneGraphRegistry } from '../cloneGraphRegistry';

class FlattingConnection {
	constructor(
		graphRegistry: GraphRegistry,
		public connectionData: ConnectionData,
	) {}

	flatten(result: GraphRegistry, parentInternalModuleId?: string) {
		const copy = structuredClone(this.connectionData);
		if (parentInternalModuleId) {
			copy.id += '_into_' + parentInternalModuleId;
			copy.targetNodeId += '_into_' + parentInternalModuleId;
			copy.inputPath.nodeId += '_into_' + parentInternalModuleId;
		}
		result.connections.add(copy);
	}
}

class FlattingNode {
	connections: FlattingConnection[];

	constructor(
		graphRegistry: GraphRegistry,
		public nodeData: NodeData,
	) {
		this.connections = graphRegistry.connections
			.values()
			.filter((connectionData) => connectionData.inputPath.nodeId === nodeData.id)
			.map((connectionData) => new FlattingConnection(graphRegistry, connectionData));
	}

	flatten(result: GraphRegistry, parentInternalModuleId?: string) {
		const copy = structuredClone(this.nodeData);
		if (parentInternalModuleId) {
			copy.id += '_into_' + parentInternalModuleId;
			copy.internalModuleId = parentInternalModuleId;
		}
		result.nodes.add(copy);

		this.connections.forEach((connection) => {
			connection.flatten(result, parentInternalModuleId);
		});
	}
}

class FlattingModuleNode extends FlattingNode {
	targetModule?: FlattingModule;

	constructor(
		graphRegistry: GraphRegistry,
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

	flatten(result: GraphRegistry, parentInternalModuleId?: string) {
		this.targetModule?.flatten(result, this.moduleNodeData.internalModuleId);

		this.connections.forEach((connection) => {
			connection.flatten(result, parentInternalModuleId);
		});
	}
}

class FlattingModule {
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

	flatten(result: GraphRegistry, parentInternalModuleId?: string) {
		if (!parentInternalModuleId) {
			result.internalModules.add(this.moduleData);
		}

		this.nodes.forEach((node) => {
			node.flatten(result, parentInternalModuleId);
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
	const flatteningGraph = new FlatteningGraph(cloneGraphRegistry(graphRegistry));
	const result = flatteningGraph.flatten();
	graphRegistry.nodes = result.nodes;
	graphRegistry.connections = result.connections;
}
