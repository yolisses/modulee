<script lang="ts">
	import { GroupNodesCommand } from '$lib/commands/group/GroupNodesCommand';
	import { createId } from '$lib/data/createId';
	import type { Node } from '$lib/data/Node.svelte';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
	import { getSelectedNodeIdsContext, Vector } from 'nodes-editor';
	import Fa from 'svelte-fa';
	import { getGroupIdContext } from './groupIdContext';

	const editorContext = getEditorContext();
	const groupIdContext = getGroupIdContext();
	const projectDataContext = getProjectDataContext();
	const selectedNodeIdsContext = getSelectedNodeIdsContext();

	function getAverageNodesPosition(nodes: Node[]) {
		let positionsSum = Vector.zero();
		nodes.forEach((node) => {
			positionsSum = positionsSum.add(node.position);
		});
		return positionsSum.divideByNumber(nodes.length).round();
	}

	function handleClick() {
		const { selectedNodeIds } = selectedNodeIdsContext;
		const nodesId = [...selectedNodeIds];
		const nodes = editorContext.editor.graph.nodes.values().filter((node) => {
			return selectedNodeIds.has(node.id);
		});
		const averagePosition = getAverageNodesPosition(nodes);

		const groupId = createId();
		const groupNodesCommand = new GroupNodesCommand({
			id: groupId,
			type: 'GroupNodesCommand',
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
			details: {
				group: {
					id: groupId,
					name: 'New group',
				},
				nodesId,
				groupNodeData: {
					id: createId(),
					type: 'GroupNode',
					groupId: groupIdContext.groupId,
					extras: { targetGroupId: groupId },
					position: averagePosition.getData(),
				},
			},
		});

		editorContext.editor.execute(groupNodesCommand);
	}
</script>

<button
	title="Group nodes"
	class="common-button"
	onclick={handleClick}
	disabled={!selectedNodeIdsContext.selectedNodeIds.size}
>
	<Fa icon={faObjectGroup} />
</button>
