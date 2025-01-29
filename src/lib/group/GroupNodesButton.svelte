<script lang="ts">
	import { GroupNodesCommand } from '$lib/commands/GroupNodesCommand';
	import { createId } from '$lib/data/createId';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectIdContext } from '$lib/project/projectIdContext';
	import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
	import { getSelectedNodesContext } from 'nodes-editor';
	import Fa from 'svelte-fa';

	const editorContext = getEditorContext();
	const projectIdContext = getProjectIdContext();
	const selectedNodesContext = getSelectedNodesContext();

	function getIsSomeNodeSelected(selectedNodes: Record<string, boolean | undefined>) {
		for (const key in selectedNodes) {
			if (selectedNodes[key]) return true;
		}
		return false;
	}

	function handleClick() {
		// TODO make selectedNodesContext use a set instead of a simple object
		const nodesId = Object.entries(selectedNodesContext.selectedNodes)
			.filter(([key, value]) => value)
			.map(([key, value]) => key);

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
	disabled={!getIsSomeNodeSelected(selectedNodesContext.selectedNodes)}
>
	<Fa icon={faObjectGroup} />
</button>
