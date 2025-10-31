import type { ConnectionData } from '$lib/connection/ConnectionData';
import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InternalModuleData } from '$lib/module/internalModule/InternalModuleData';
import type { NodeData } from '$lib/node/data/NodeData';
import type { ConstantNodeData } from '$lib/node/data/variants/ConstantNodeData';
import type { InputNodeData } from '$lib/node/data/variants/InputNodeData';
import type { ModuleNodeData } from '$lib/node/data/variants/ModuleNodeData';
import type { OutputNodeData } from '$lib/node/data/variants/OutputNodeData';
import { cloneGraphRegistry } from '../cloneGraphRegistry';

class FlattingConnection {
	targetNode!: FlattingNode;

	constructor(public connectionData: ConnectionData) {}

	flatten(result: GraphRegistry, stack: FlattingModuleNode[]) {
		const copy = structuredClone(this.connectionData);
		const lastModuleNode = stack.at(-1);
		if (lastModuleNode) {
			copy.id += '_for_' + lastModuleNode.nodeData.id;
			copy.inputPath.nodeId += '_for_' + lastModuleNode.nodeData.id;
		}
		copy.targetNodeId = this.targetNode.getIdForConnectionTarget(stack);
		result.connections.add(copy);
	}

	setTargetNode(nodeOptions: FlattingNode[]) {
		const targetNode = nodeOptions.find(
			(nodeOption) => nodeOption.nodeData.id === this.connectionData.targetNodeId,
		);
		if (!targetNode) {
			throw new Error('Missing target node', { cause: this.connectionData.targetNodeId });
		}
		this.targetNode = targetNode;
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
			.map((connectionData) => new FlattingConnection(connectionData));
	}

	flatten(result: GraphRegistry, stack: FlattingModuleNode[]) {
		const copy = structuredClone(this.nodeData);
		const lastModuleNode = stack.at(-1);
		if (lastModuleNode) {
			copy.id += '_for_' + lastModuleNode.nodeData.id;
			copy.internalModuleId = lastModuleNode.nodeData.internalModuleId;
		}
		result.nodes.add(copy);

		this.connections.forEach((connection) => {
			connection.flatten(result, stack);
		});
	}

	getIdForConnectionTarget(stack: FlattingModuleNode[]) {
		let { id } = this.nodeData;
		const lastModuleNode = stack.at(-1);
		if (lastModuleNode) {
			id += '_for_' + lastModuleNode.nodeData.id;
		}
		return id;
	}

	createPlaceholder(result: GraphRegistry, stack: FlattingModuleNode[], replacedNode: NodeData) {
		const placeholder: ConstantNodeData = {
			extras: { value: 0 },
			id: replacedNode.id + '_placeholder',
			internalModuleId: replacedNode.internalModuleId,
			isInputAutoConnectedMap: {},
			position: { x: 0, y: 0 },
			type: 'ConstantNode',
			unconnectedInputValues: {},
		};
		const lastModuleNode = stack.at(-1);
		if (lastModuleNode) {
			placeholder.id += '_for_' + lastModuleNode.nodeData.id;
		}
		result.nodes.add(placeholder);
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

	flatten(result: GraphRegistry, stack: FlattingModuleNode[]) {
		this.targetModule?.flatten(result, [...stack, this]);
		if (!this.getModuleOutputNode()) {
			this.createPlaceholder(result, stack, this.nodeData);
		}
	}

	setTarget(moduleOptions: FlattingModule[]) {
		const moduleId = this.moduleNodeData.extras.moduleReference?.moduleId;
		if (!moduleId) return;
		this.targetModule = moduleOptions.find(
			(moduleOption) => moduleOption.moduleData.id === moduleId,
		);
	}

	getModuleOutputNode() {
		return this.targetModule?.nodes.find((node) => node instanceof FlattingOutputNode);
	}

	getIdForConnectionTarget(stack: FlattingModuleNode[]) {
		const moduleOutputNode = this.getModuleOutputNode();

		if (moduleOutputNode && this.targetModule) {
			return moduleOutputNode.getIdForConnectionTarget([...stack, this]);
		}

		return this.moduleNodeData.id + '_placeholder';
	}

	getTargetForInputNode(inputNode: FlattingInputNode) {
		return this.connections.find(
			(connection) => connection.connectionData.inputPath.inputKey === inputNode.inputNodeData.id,
		)?.targetNode;
	}
}

class FlattingOutputNode extends FlattingNode {
	constructor(
		graphRegistry: GraphRegistry,
		public outputNodeData: OutputNodeData,
	) {
		super(graphRegistry, outputNodeData);
	}

	flatten(result: GraphRegistry, stack: FlattingModuleNode[]) {
		if (stack.length > 0) return;
		super.flatten(result, stack);
	}

	getTargetNode() {
		return this.connections.at(0)?.targetNode;
	}

	getIdForConnectionTarget(stack: FlattingModuleNode[]) {
		const targetNode = this.getTargetNode();
		if (targetNode) {
			return targetNode.getIdForConnectionTarget(stack);
		}

		return this.outputNodeData.id + '_placeholder';
	}
}

class FlattingInputNode extends FlattingNode {
	constructor(
		graphRegistry: GraphRegistry,
		public inputNodeData: InputNodeData,
	) {
		super(graphRegistry, inputNodeData);
	}

	flatten(result: GraphRegistry, stack: FlattingModuleNode[]) {
		if (stack.length > 0) return;
		super.flatten(result, stack);
	}

	getIdForConnectionTarget(stack: FlattingModuleNode[]) {
		const lastModuleNode = stack.at(-1);

		if (!lastModuleNode) {
			return this.inputNodeData.id;
		}

		const targetNode = lastModuleNode?.getTargetForInputNode(this);
		if (targetNode) {
			return targetNode.getIdForConnectionTarget(stack.slice(0, -1));
		}

		return this.inputNodeData.id + '_placeholder';
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
		if (stack.length === 0) {
			result.internalModules.add(this.moduleData);
		}

		this.nodes.forEach((node) => {
			node.flatten(result, stack);
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

		const nodes = this.modules.flatMap((module) => module.nodes);
		const connections = nodes.flatMap((node) => node.connections);
		connections.forEach((connection) => connection.setTargetNode(nodes));
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
			module.flatten(result, []);
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
