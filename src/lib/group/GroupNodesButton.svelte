<script lang="ts">
	import { GroupNodesActionCommand } from '$lib/node/actionCommands/GroupNodesActionCommand';
	import { getContextsContext } from '$lib/shortcut/contextsContext';
	import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
	import { getSelectedNodeIdsContext } from 'nodes-editor';
	import Fa from 'svelte-fa';

	const contextsContext = getContextsContext();
	const selectedNodeIdsContext = getSelectedNodeIdsContext();

	function handleClick() {
		const actionCommand = new GroupNodesActionCommand();
		actionCommand.execute(contextsContext.contexts);
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
