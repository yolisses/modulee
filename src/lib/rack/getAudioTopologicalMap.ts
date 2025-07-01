import type { TopologicalMap } from '$lib/connection/TopologicalMap';
import type { ModuleNode } from '$lib/node/ModuleNode.svelte';

export function getAudioTopologicalMap(moduleNodes: ModuleNode[]) {
	const graph: TopologicalMap = new Map();
	moduleNodes.forEach((moduleNode) => {
		const inputs = [];
		const targetNodeId = moduleNode.audioInput?.targetNode?.id;
		if (targetNodeId && moduleNodes.some((moduleNode) => moduleNode.id === targetNodeId)) {
			inputs.push(targetNodeId);
		}
		graph.set(moduleNode.id, inputs);
	});
	return graph;
}
