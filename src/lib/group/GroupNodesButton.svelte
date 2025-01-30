<script lang="ts">
	import { GroupNodesCommand } from '$lib/commands/GroupNodesCommand';
	import { createId } from '$lib/data/createId';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectIdContext } from '$lib/project/projectIdContext';
	import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
	import { getSelectedNodeIdsContext } from 'nodes-editor';
	import Fa from 'svelte-fa';

	const editorContext = getEditorContext();
	const projectIdContext = getProjectIdContext();
	const selectedNodeIdsContext = getSelectedNodeIdsContext();

	function handleClick() {
		const nodesId = [...selectedNodeIdsContext.selectedNodeIds];
		const groupNodesCommand = new GroupNodesCommand({
			createdAt: new Date().toJSON(),
			id: createId(),
			projectId: projectIdContext.projectId,
			type: 'GroupNodesCommand',
			details: {
				group: { id: createId(), name: 'New group' },
				nodesId,
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
