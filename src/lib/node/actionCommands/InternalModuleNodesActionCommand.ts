import { InternalModuleNodesCommand } from '$lib/commands/internalModule/InternalModuleNodesCommand';
import { createId } from '$lib/data/createId';
import type { Node } from '$lib/data/Node.svelte';
import type { NodeData } from '$lib/data/NodeData';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';
import { Vector } from '../../../../../nodes-editor/dist/space/Vector';

function getAverageNodesPosition(nodes: Node[]) {
	let positionsSum = Vector.zero();
	nodes.forEach((node) => {
		positionsSum = positionsSum.add(node.position);
	});
	return positionsSum.divideByNumber(nodes.length).round();
}

export class InternalModuleNodesActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { graph } = contexts.graphContext;
		const { editor } = contexts.editorContext;
		const { projectData } = contexts.projectDataContext;
		const { selectedNodeIds } = contexts.selectedNodeIdsContext;
		const { internalModuleId: currentInternalModuleId } = contexts.internalModuleIdContext;

		const nodesId = [...selectedNodeIds];
		const nodes = graph.nodes.values().filter((node) => {
			return selectedNodeIds.has(node.id);
		});
		const averagePosition = getAverageNodesPosition(nodes);

		const newInternalModuleId = createId();
		const internalModuleNodesCommand = new InternalModuleNodesCommand({
			id: newInternalModuleId,
			type: 'InternalModuleNodesCommand',
			createdAt: new Date().toJSON(),
			projectId: projectData.id,
			details: {
				nodesId,
				internalModule: {
					id: newInternalModuleId,
					name: 'New internalModule',
				},
				internalModuleNodeData: {
					id: createId(),
					type: 'InternalModuleNode',
					internalModuleId: currentInternalModuleId,
					position: averagePosition.getData(),
					extras: { targetInternalModuleId: newInternalModuleId },
				},
			},
		});

		editor.execute(internalModuleNodesCommand);
	}
}
