import { Connection } from '$lib/connection/Connection';
import { ById } from '$lib/editor/ById';
import { getAreInputPathsEqual } from '$lib/input/getAreInputPathsEqual';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { InternalModule } from '$lib/module/internalModule/InternalModule';
import type { Module } from '$lib/module/Module';
import { instantiateNode } from '$lib/node/instantiateNode';
import { ModuleNode } from '$lib/node/ModuleNode.svelte';
import type { Node } from '$lib/node/Node.svelte';
import { cloneGraphRegistry } from '$lib/process/cloneGraphRegistry';
import { ExternalModule } from '../module/externalModule/ExternalModule';
import type { GraphRegistry } from './GraphRegistry';

export class Graph {
	nodes = new ById<Node>();
	modules = new ById<Module>();
	connections = new ById<Connection>();
	internalModules = new ById<InternalModule>();
	externalModules = new ById<ExternalModule>();

	constructor(graphRegistry: GraphRegistry, externalModulesData: ExternalModuleData[]) {
		graphRegistry = cloneGraphRegistry(graphRegistry);

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
			node.inputs.forEach((input) => {
				const targetNodeId = graphRegistry.connections.values().find((connection) => {
					return getAreInputPathsEqual(connection.inputPath, {
						nodeId: input.node.id,
						inputKey: input.key,
					});
				})?.targetNodeId;
				if (targetNodeId) {
					input.targetNode = this.nodes.getOrNull(targetNodeId) ?? undefined;
				}
			});
		});
	}
}
