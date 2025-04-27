<script lang="ts">
	import { getShortcutStringForCommandType } from '$lib/editor/getShortcutStringForCommandType.svelte';
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

	const shortcutString = getShortcutStringForCommandType('GroupNodesActionCommand');
</script>

<button
	class="common-button"
	onclick={handleClick}
	title="Group nodes {shortcutString}"
	disabled={!selectedNodeIdsContext.selectedNodeIds.size}
>
	<Fa fw icon={faObjectGroup} />
</button>
