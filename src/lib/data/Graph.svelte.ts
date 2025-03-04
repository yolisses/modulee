import { ById } from '$lib/editor/ById';
import { Connection } from './Connection';
import type { Connector } from './Connector';
import type { GraphData } from './GraphData';
import { Group } from './Group.svelte';
import { GroupNode } from './GroupNode.svelte';
import { instantiateNode } from './instantiateNode';
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
			const node = instantiateNode(nodeData);
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
}
