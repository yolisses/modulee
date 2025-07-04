import { copyDataContextKey } from '$lib/graph/copy/copyDataContext';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';
import { selectedNodeIdsContextKey } from 'nodes-editor';

export class CopyNodesActionCommand extends ActionCommand {
	execute(contexts: Contexts): void {
		const copyDataContext = contexts.get(copyDataContextKey);
		const { projectData } = contexts.get(projectDataContextKey);
		const { selectedNodeIds } = contexts.get(selectedNodeIdsContextKey);

		if (selectedNodeIds.size === 0) {
			return;
		}

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

		copyDataContext.copyData = {
			nodes: selectedNodesData,
			connections: selectedConnectionsData,
		};
		copyDataContext.offset = 0;
	}
}
