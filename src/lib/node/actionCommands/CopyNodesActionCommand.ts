import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';

export class CopyNodesActionCommand extends ActionCommand {
	execute(contexts: Contexts): void {
		const { projectData } = contexts.projectDataContext;
		const { selectedNodeIds } = contexts.selectedNodeIdsContext;

		const selectedNodesData = structuredClone(
			projectData.graph.nodes.filter((nodeData) => {
				return selectedNodeIds.has(nodeData.id);
			}),
		);

		// TODO consider creating a selected connections context
		const selectedConnectionsData = structuredClone(
			projectData.graph.connections.filter((connectionData) => {
				return (
					selectedNodeIds.has(connectionData.inputPath.nodeId) &&
					selectedNodeIds.has(connectionData.targetNodeId)
				);
			}),
		);

		contexts.copyDataContext.copyData = {
			nodes: selectedNodesData,
			connections: selectedConnectionsData,
		};
	}
}
