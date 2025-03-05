<script lang="ts">
	import { getShortcutStringForCommandType } from '$lib/editor/getShortcutStringForCommandType.svelte';
	import { ToggleIsLateralBarVisibleActionCommand } from '$lib/node/actionCommands/ToggleLateralBarActionCommand';
	import { getContextsContext } from '$lib/shortcut/contextsContext';
	import {
		faChevronLeft,
		faChevronRight,
		faWindowMaximize,
	} from '@fortawesome/free-solid-svg-icons';
	import Fa, { FaLayers } from 'svelte-fa';
	import { getIsLateralBarVisibleContext } from './isLateralBarVisibleContext';

	const contextsContext = getContextsContext();
	const isLateralBarVisibleContext = getIsLateralBarVisibleContext();

	function handleClick() {
		const actionCommand = new ToggleIsLateralBarVisibleActionCommand();
		actionCommand.execute(contextsContext.contexts);
	}

	const shortcutString = getShortcutStringForCommandType('ToggleIsLateralBarVisibleActionCommand');
</script>

<button
	class="common-button"
	onclick={handleClick}
	title={(isLateralBarVisibleContext.isLateralBarVisible ? 'Hide' : 'Show') +
		' lateral bar ' +
		shortcutString}
>
	<FaLayers>
		<Fa icon={faWindowMaximize} rotate={-90} />
		<Fa
			icon={isLateralBarVisibleContext.isLateralBarVisible ? faChevronRight : faChevronLeft}
			scale={0.5}
			class="text-zinc-900"
			translateX={0.1}
		/>
	</FaLayers>
</button>
