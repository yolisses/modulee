<script lang="ts">
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
</script>

<button class="common-button" onclick={handleClick}>
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
