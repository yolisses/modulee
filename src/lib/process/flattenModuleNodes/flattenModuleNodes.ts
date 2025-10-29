import type { ConnectionData } from '$lib/connection/ConnectionData';
import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InternalModuleData } from '$lib/module/internalModule/InternalModuleData';
import type { NodeData } from '$lib/node/data/NodeData';
import type { ModuleNodeData } from '$lib/node/data/variants/ModuleNodeData';
import type { ModuleVoicesNodeData } from '$lib/node/data/variants/ModuleVoicesNodeData';

class FlattingModule {
	constructor(
		public graphRegistry: GraphRegistry,
		public internalModuleData: InternalModuleData,
	) {}

	// TODO rename
	doTheThing() {
		const nodes = this.graphRegistry.nodes.values().filter((nodeData) => {
			return nodeData.internalModuleId === this.internalModuleData.id;
		});

		const nodesById = ById.fromItems(nodes);

		const connections = this.graphRegistry.connections.values().filter((connectionData) => {
			return (
				nodesById.containsId(connectionData.inputPath.nodeId) &&
				nodesById.containsId(connectionData.targetNodeId)
			);
		});

		const connectionsById = ById.fromItems(connections);

		nodes.forEach((nodeData) => {
			if (nodeData.type === 'ModuleVoicesNode') {
				this.doTheThingForModuleVoicesNode(nodeData, nodesById, connectionsById);
			}
			if (nodeData.type === 'ModuleNode') {
				this.doTheThingForModuleNode(nodeData, nodesById, connectionsById);
			}
		});

		return {
			nodes: nodesById,
			connections: connectionsById,
		};
	}

	private doTheThingForModuleNode(
		nodeData: ModuleNodeData,
		nodesById: ById<NodeData>,
		connectionsById: ById<ConnectionData>,
	) {
		const moduleId = nodeData.extras.moduleReference?.moduleId;

		if (!moduleId) return;
		if (!this.graphRegistry.internalModules.containsId(moduleId)) return;

		const requiredInternalModuleData = this.graphRegistry.internalModules.get(moduleId);
		const flattingModule = new FlattingModule(this.graphRegistry, requiredInternalModuleData);

		const result = flattingModule.doTheThing();
		nodesById.addMany(result.nodes.values());
		connectionsById.addMany(result.connections.values());
	}

	private doTheThingForModuleVoicesNode(
		nodeData: ModuleVoicesNodeData,
		nodesById: ById<NodeData>,
		connectionsById: ById<ConnectionData>,
	) {
		const moduleId = nodeData.extras.moduleReference?.moduleId;

		if (!moduleId) return;
		if (!this.graphRegistry.internalModules.containsId(moduleId)) return;

		const requiredInternalModuleData = this.graphRegistry.internalModules.get(moduleId);
		const flattingModule = new FlattingModule(this.graphRegistry, requiredInternalModuleData);

		const result = flattingModule.doTheThing();
		nodesById.addMany(result.nodes.values());
		connectionsById.addMany(result.connections.values());
	}
}

export function flattenModuleNodes(graphRegistry: GraphRegistry) {
	const mainInternalModule = graphRegistry.internalModules.get(graphRegistry.mainInternalModuleId);

	const flattingModule = new FlattingModule(graphRegistry, mainInternalModule);
	const { nodes, connections } = flattingModule.doTheThing();

	graphRegistry.nodes = nodes;
	graphRegistry.connections = connections;

	console.log(graphRegistry);
}
