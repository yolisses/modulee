import type { ConnectionData } from '$lib/connection/ConnectionData';
import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';
import type { ModuleNodeData } from '$lib/node/data/variants/ModuleNodeData';
import type { ModuleVoicesNodeData } from '$lib/node/data/variants/ModuleVoicesNodeData';

class FlattingModule {
	constructor(
		public graphRegistry: GraphRegistry,
		public internalModuleId: string,
	) {}

	// TODO rename
	doTheThing() {
		const nodes = this.graphRegistry.nodes
			.values()
			.filter((nodeData) => {
				return nodeData.internalModuleId === this.internalModuleId;
			})
			.map((value) => structuredClone(value));

		const nodesById = ById.fromItems(nodes);

		const connections = this.graphRegistry.connections
			.values()
			.filter((connectionData) => {
				return (
					nodesById.containsId(connectionData.inputPath.nodeId) &&
					nodesById.containsId(connectionData.targetNodeId)
				);
			})
			.map((value) => structuredClone(value));

		const connectionsById = ById.fromItems(connections);

		nodes.forEach((nodeData) => {
			if (nodeData.type === 'ModuleVoicesNode') {
				this.doTheThingForModuleVoicesNode(nodeData, nodesById, connectionsById);
			}
			if (nodeData.type === 'ModuleNode') {
				this.doTheThingForModuleNode(
					nodeData,
					nodesById,
					connectionsById,
					nodeData.internalModuleId,
				);
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
		newModuleId: string,
	) {
		const moduleId = nodeData.extras.moduleReference?.moduleId;

		if (!moduleId) return;
		if (!this.graphRegistry.internalModules.containsId(moduleId)) return;

		const flattingModule = new FlattingModule(this.graphRegistry, moduleId);

		const result = flattingModule.doTheThing();
		result.nodes.values().forEach((nodeData) => {
			nodeData.id += '_copy_to_' + newModuleId;
		});
		result.connections.values().forEach((connection) => {
			connection.id += '_copy_to_' + newModuleId;
			connection.targetNodeId += '_copy_to_' + newModuleId;
			connection.inputPath.nodeId += '_copy_to_' + newModuleId;
		});

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

		const flattingModule = new FlattingModule(this.graphRegistry, moduleId);

		const result = flattingModule.doTheThing();
		nodesById.addMany(result.nodes.values());
		connectionsById.addMany(result.connections.values());
	}
}

export function flattenModuleNodes(graphRegistry: GraphRegistry) {
	const flattingModule = new FlattingModule(graphRegistry, graphRegistry.mainInternalModuleId);
	const { nodes, connections } = flattingModule.doTheThing();

	graphRegistry.nodes = nodes;
	graphRegistry.connections = connections;

	console.log(graphRegistry);
}
