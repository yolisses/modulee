import { internalModuleContextKey } from '$lib/module/internalModule/internalModuleContext';
import type { NodeData } from '$lib/node/data/NodeData';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';
import { selectedNodeIdsContextKey } from 'nodes-editor';

export class SelectedAllNodesActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { internalModule } = contexts.get(internalModuleContextKey);
		const { selectedNodeIds } = contexts.get(selectedNodeIdsContextKey);

		selectedNodeIds.clear();
		internalModule.nodes.values().forEach((node) => {
			selectedNodeIds.add(node.id);
		});
	}
}
