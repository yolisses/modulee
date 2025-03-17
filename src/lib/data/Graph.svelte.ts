import { ById } from '$lib/editor/ById';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { cloneGraphRegistry } from '$lib/process/cloneGraphRegistry';
import { Connection } from './Connection';
import type { Connector } from './Connector';
import { ExternalModule } from './ExternalModule';
import type { GraphRegistry } from './GraphRegistry';
import { instantiateNode } from './instantiateNode';
import { InternalModule } from './InternalModule.svelte';
import type { Module } from './Module';
import { ModuleNode } from './ModuleNode.svelte';
import { Node } from './Node.svelte';

export class Graph {
	mainInternalModuleId: string;
	nodes = new ById<Node>();
	modules = new ById<Module>();
	connectors = new ById<Connector>();
	connections = new ById<Connection>();
	internalModules = new ById<InternalModule>();
	externalModules = new ById<ExternalModule>();

	constructor(graphRegistry: GraphRegistry, externalModulesData: ExternalModuleData[]) {
		graphRegistry = cloneGraphRegistry(graphRegistry);
		this.mainInternalModuleId = graphRegistry.mainInternalModuleId;

		graphRegistry.nodes.values().forEach((nodeData) => {
			const node = instantiateNode(nodeData);
			this.nodes.add(node);
		});

		graphRegistry.internalModules.values().forEach((internalModuleData) => {
			const internalModule = new InternalModule(internalModuleData, this.nodes);
			this.internalModules.add(internalModule);
			this.modules.add(internalModule);
		});

		externalModulesData.forEach((externalModuleData) => {
			const externalModule = new ExternalModule(externalModuleData);
			this.externalModules.add(externalModule);
			this.modules.add(externalModule);
		});
		console.log(this.modules.values());

		this.nodes.values().forEach((node) => {
			if (node instanceof ModuleNode) {
				node.fillModule(this.modules);
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
