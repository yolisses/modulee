import { ById } from '$lib/editor/ById';
import { Graph } from '$lib/graph/Graph.svelte';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { Module } from '$lib/module/Module';
import type { NodeData } from '$lib/node/data/NodeData';
import { ModuleNode } from '$lib/node/ModuleNode.svelte';
import { Node } from '$lib/node/Node.svelte';

function visitNode(node: Node, visitedNodes: Set<Node>) {
	if (visitedNodes.has(node)) return;
	visitedNodes.add(node);
	node.inputs.forEach((input) => {
		const { targetNode } = input;
		if (!targetNode) return;
		visitNode(targetNode, visitedNodes);
	});
	if (node instanceof ModuleNode) {
		const { targetModule } = node;
		if (!targetModule) return;
		visitModule(targetModule, visitedNodes);
	}
}

function visitModule(module: Module, visitedNodes: Set<Node>) {
	const outputNode = module.nodes.find((node) => {
		return node.type === 'OutputNode';
	});
	if (!outputNode) return;
	visitNode(outputNode, visitedNodes);
}

export function removeUnusedNodes(graphRegistry: GraphRegistry) {
	const graph = new Graph(graphRegistry);
	const visitedNodes = new Set<Node>();
	const mainModule = graph.modules.get(graphRegistry.mainInternalModuleId);
	visitModule(mainModule, visitedNodes);

	graphRegistry.nodes = ById.fromItems(
		visitedNodes
			.values()
			.map((node) => node.nodeData)
			.toArray() as NodeData[],
	);
}
