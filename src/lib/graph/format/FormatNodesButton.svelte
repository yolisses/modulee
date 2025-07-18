<script lang="ts">
	import { getShortcutStringForCommandType } from '$lib/editor/getShortcutStringForCommandType.svelte';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { FormatNodesActionCommand } from '$lib/node/actionCommands/FormatNodesActionCommand';
	import { contextsContextKey } from '$lib/shortcut/contextsContext';
	import { faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const contextsContext = getRequiredContext(contextsContextKey);

	function handleClick() {
		const actionCommand = new FormatNodesActionCommand();
		actionCommand.execute(contextsContext.contexts);
	}

	const shortcutString = getShortcutStringForCommandType('FormatNodesActionCommand');
</script>

<button class="common-button" onclick={handleClick} title="Format nodes {shortcutString}">
	<Fa rotate={90} flip="horizontal" fw icon={faArrowUpWideShort} />
</button>
