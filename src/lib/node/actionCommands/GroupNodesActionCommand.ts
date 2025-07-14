import { GroupNodesCommand } from '$lib/commands/internalModule/GroupNodesCommand';
import { editorContextKey } from '$lib/editor/editorContext';
import { createId } from '$lib/global/createId';
import { graphContextKey } from '$lib/graph/graphContext';
import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
import type { Node } from '$lib/node/Node.svelte';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';
import { selectedNodeIdsContextKey, Vector } from 'nodes-editor';
import type { NodeData } from '../data/NodeData';

function getAverageNodesPosition(nodes: Node[]) {
	let positionsSum = Vector.zero();
	nodes.forEach((node) => {
		positionsSum = positionsSum.add(node.position);
	});
	return positionsSum.divideByNumber(nodes.length).round();
}

export class GroupNodesActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { graph } = contexts.get(graphContextKey);
		const { editor } = contexts.get(editorContextKey);
		const { projectData } = contexts.get(projectDataContextKey);
		const { selectedNodeIds } = contexts.get(selectedNodeIdsContextKey);
		const { internalModuleId: currentInternalModuleId } = contexts.get(internalModuleIdContextKey);

		const nodesId = [...selectedNodeIds];
		const nodes = graph.nodes.values().filter((node) => {
			return selectedNodeIds.has(node.id);
		});
		const averagePosition = getAverageNodesPosition(nodes);

		const newInternalModuleId = createId();
		const groupNodesCommand = new GroupNodesCommand({
			id: createId(),
			type: 'GroupNodesCommand',
			projectId: projectData.id,
			createdAt: new Date().toJSON(),
			details: {
				nodesId,
				internalModule: {
					id: newInternalModuleId,
					name: 'New internalModule',
				},
				moduleNodeData: {
					id: createId(),
					type: 'ModuleNode',
					unconnectedInputValues: {},
					isInputAutoConnectedMap: {},
					position: averagePosition.getData(),
					internalModuleId: currentInternalModuleId,
					extras: { moduleReference: { type: 'internal', moduleId: newInternalModuleId } },
				},
			},
		});

		editor.execute(groupNodesCommand);
	}
}
