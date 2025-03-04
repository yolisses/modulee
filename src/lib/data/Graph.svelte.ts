import { ById } from '$lib/editor/ById';
import { cloneGraphData } from '$lib/process/cloneGraphData';
import { Connection } from './Connection';
import type { Connector } from './Connector';
import type { GraphData } from './GraphData';
import { Group } from './Group.svelte';
import { GroupNode } from './GroupNode.svelte';
import { instantiateNode } from './instantiateNode';
import { Node } from './Node.svelte';

export class Graph {
	mainGroupId: string;
	nodes = new ById<Node>();
	groups = new ById<Group>();
	connectors = new ById<Connector>();
	connections = new ById<Connection>();

	constructor(graphData: GraphData) {
		graphData = cloneGraphData(graphData);
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
