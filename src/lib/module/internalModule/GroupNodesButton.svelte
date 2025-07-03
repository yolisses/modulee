<script lang="ts">
	import { getShortcutStringForCommandType } from '$lib/editor/getShortcutStringForCommandType.svelte';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { GroupNodesActionCommand } from '$lib/node/actionCommands/GroupNodesActionCommand';
	import { contextsContextKey } from '$lib/shortcut/contextsContext';
	import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const contextsContext = getRequiredContext(contextsContextKey);
	const selectedNodeIdsContext = getRequiredContext(selectedNodeIdsContextKey);

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
