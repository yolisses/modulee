<script lang="ts">
	import { getShortcutStringForCommandType } from '$lib/editor/getShortcutStringForCommandType.svelte';
	import { InternalModuleNodesActionCommand } from '$lib/node/actionCommands/InternalModuleNodesActionCommand';
	import { getContextsContext } from '$lib/shortcut/contextsContext';
	import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
	import { getSelectedNodeIdsContext } from 'nodes-editor';
	import Fa from 'svelte-fa';

	const contextsContext = getContextsContext();
	const selectedNodeIdsContext = getSelectedNodeIdsContext();

	function handleClick() {
		const actionCommand = new InternalModuleNodesActionCommand();
		actionCommand.execute(contextsContext.contexts);
	}

	const shortcutString = getShortcutStringForCommandType('InternalModuleNodesActionCommand');
</script>

<button
	class="common-button"
	onclick={handleClick}
	title="InternalModule nodes {shortcutString}"
	disabled={!selectedNodeIdsContext.selectedNodeIds.size}
>
	<Fa icon={faObjectGroup} />
</button>
