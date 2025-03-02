<script lang="ts">
	import { getGraphContext } from '$lib/data/graphContext';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { GroupNodesActionCommand } from '$lib/node/actionCommands/GroupNodesActionCommand';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import type { Contexts } from '$lib/shortcut/contexts';
	import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
	import { getSelectedNodeIdsContext } from 'nodes-editor';
	import Fa from 'svelte-fa';
	import { getGroupIdContext } from './groupIdContext';

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const groupIdContext = getGroupIdContext();
	const projectDataContext = getProjectDataContext();
	const selectedNodeIdsContext = getSelectedNodeIdsContext();

	function handleClick() {
		const actionCommand = new GroupNodesActionCommand();
		// TODO find a more type safe way of doing this
		actionCommand.execute({
			graphContext,
			editorContext,
			groupIdContext,
			projectDataContext,
			selectedNodeIdsContext,
		} as Contexts);
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
