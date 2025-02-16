import { ById } from '$lib/editor/ById';
import { Connection } from './Connection';
import type { Connector } from './Connector';
import { ConstantNode } from './ConstantNode.svelte';
import type { GraphData } from './GraphData';
import { Group } from './Group.svelte';
import { GroupNode } from './GroupNode.svelte';
import { Node } from './Node.svelte';

export class Graph {
	mainGroupId: string;
	nodesContent: Record<string, Node> = $state({});
	groupsContent: Record<string, Group> = $state({});
	connectorsContent: Record<string, Connector> = $state({});
	connectionsContent: Record<string, Connection> = $state({});

	nodes = new ById<Node>(this.nodesContent);
	groups = new ById<Group>(this.groupsContent);
	connectors = new ById<Connector>(this.connectorsContent);
	connections = new ById<Connection>(this.connectionsContent);

	constructor(graphData: GraphData) {
		this.mainGroupId = graphData.mainGroupId;

		graphData.nodes.values().forEach((nodeData) => {
			let node: Node;
			if (nodeData.type === 'GroupNode' || nodeData.type === 'GroupVoicesNode') {
				node = new GroupNode(nodeData, graphData.connections);
			} else if (nodeData.type === 'ConstantNode') {
				node = new ConstantNode(nodeData, graphData.connections);
			} else {
				node = new Node(nodeData, graphData.connections);
			}
			this.nodes.add(node);
		});

		graphData.groups.values().forEach((groupData) => {
			const group = new Group(groupData, this.nodes);
			this.groups.add(group);
		});

		this.nodes.values().forEach((node) => {
			if (node instanceof GroupNode) {
				node.updateGroup(this.groups);
			}
		});

		graphData.connections.values().forEach((connectionData) => {
			const connection = new Connection(connectionData);
			this.connections.add(connection);
		});

		this.nodes.values().forEach((node) => {
			this.connectors.add(node.output);
			node.inputs.forEach((input) => {
				this.connectors.add(input);
			});
		});
	}

	getData(): GraphData {
		return {
			mainGroupId: this.mainGroupId,
			groups: ById.fromItems(this.groups.values()),
			connections: ById.fromItems(this.connections.values()),
			nodes: ById.fromItems(this.nodes.values().map((node) => node.getData())),
		};
	}
}
