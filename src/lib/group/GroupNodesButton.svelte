<script lang="ts">
	import { GroupNodesCommand } from '$lib/commands/GroupNodesCommand';
	import { createId } from '$lib/data/createId';
	import type { Node } from '$lib/data/Node.svelte';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectIdContext } from '$lib/project/projectIdContext';
	import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
	import { getSelectedNodeIdsContext, Vector } from 'nodes-editor';
	import Fa from 'svelte-fa';
	import { getGroupIdContext } from './groupIdContext';

	const editorContext = getEditorContext();
	const groupIdContext = getGroupIdContext();
	const projectIdContext = getProjectIdContext();
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
		const nodes = editorContext.editor.nodes.filter((node) => {
			return selectedNodeIds.has(node.id);
		});
		const averagePosition = getAverageNodesPosition(nodes);

		const groupId = createId();
		const groupNodesCommand = new GroupNodesCommand({
			createdAt: new Date().toJSON(),
			id: groupId,
			projectId: projectIdContext.projectId,
			type: 'GroupNodesCommand',
			details: {
				group: { id: groupId, name: 'New group' },
				nodesId,
				groupNodeData: {
					inputs: [],
					outputs: [],
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
