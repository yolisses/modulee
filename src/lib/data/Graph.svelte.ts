import { ById } from '$lib/editor/ById';
import { cloneGraphRegistry } from '$lib/process/cloneGraphRegistry';
import { Connection } from './Connection';
import type { Connector } from './Connector';
import type { GraphRegistry } from './GraphRegistry';
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

	constructor(graphRegistry: GraphRegistry) {
		graphRegistry = cloneGraphRegistry(graphRegistry);
		this.mainGroupId = graphRegistry.mainGroupId;

		graphRegistry.nodes.values().forEach((nodeData) => {
			const node = instantiateNode(nodeData);
			this.nodes.add(node);
		});

		graphRegistry.groups.values().forEach((groupData) => {
			const group = new Group(groupData, this.nodes);
			this.groups.add(group);
		});

		this.nodes.values().forEach((node) => {
			if (node instanceof GroupNode) {
				node.updateGroup(this.groups);
			}
		});

		graphRegistry.connections.values().forEach((connectionData) => {
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
