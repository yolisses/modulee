<script lang="ts">
	import { getShortcutStringForCommandType } from '$lib/editor/getShortcutStringForCommandType.svelte';
	import { ToggleIsSidebarVisibleActionCommand } from '$lib/node/actionCommands/ToggleSidebarActionCommand';
	import { getContextsContext } from '$lib/shortcut/contextsContext';
	import {
		faChevronLeft,
		faChevronRight,
		faWindowMaximize,
	} from '@fortawesome/free-solid-svg-icons';
	import Fa, { FaLayers } from 'svelte-fa';
	import { getIsSidebarVisibleContext } from './isSidebarVisibleContext';

	const contextsContext = getContextsContext();
	const isSidebarVisibleContext = getIsSidebarVisibleContext();

	function handleClick() {
		const actionCommand = new ToggleIsSidebarVisibleActionCommand();
		actionCommand.execute(contextsContext.contexts);
	}

	const shortcutString = getShortcutStringForCommandType('ToggleIsSidebarVisibleActionCommand');
</script>

<button
	class="common-button"
	onclick={handleClick}
	title={(isSidebarVisibleContext.isSidebarVisible ? 'Hide' : 'Show') +
		' sidebar ' +
		shortcutString}
>
	<FaLayers>
		<Fa icon={faWindowMaximize} rotate={-90} />
		<Fa
			icon={isSidebarVisibleContext.isSidebarVisible ? faChevronRight : faChevronLeft}
			scale={0.5}
			class="text-zinc-900"
			translateX={0.1}
		/>
	</FaLayers>
</button>
