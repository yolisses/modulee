<script lang="ts">
	import { getShortcutStringForCommandType } from '$lib/editor/getShortcutStringForCommandType.svelte';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { zoomContextKey } from '$lib/space/zoom/zoomContext';
	import { ZoomInCommand } from '$lib/space/zoom/ZoomInCommand';
	import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const zoomContext = getRequiredContext(zoomContextKey);

	function handleClick() {
		const command = new ZoomInCommand();
		command.execute({ zoomContext });
	}

	const shortcutString = getShortcutStringForCommandType('ZoomInCommand');
</script>

<button class="common-button" onclick={handleClick} title="Zoom in {shortcutString}">
	<Fa fw icon={faMagnifyingGlassPlus} />
</button>
