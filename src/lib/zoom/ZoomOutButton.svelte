<script lang="ts">
	import { getShortcutStringForCommandType } from '$lib/editor/getShortcutStringForCommandType.svelte';
	import { ZoomOutCommand } from '$lib/space/zoom/ZoomOutCommand';
	import { faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const zoomContext = getRequiredContext(zoomContextKey);

	function handleClick() {
		const command = new ZoomOutCommand();
		command.execute({ zoomContext });
	}

	const shortcutString = getShortcutStringForCommandType('ZoomOutCommand');
</script>

<button class="common-button" onclick={handleClick} title="Zoom out {shortcutString}">
	<Fa fw icon={faMagnifyingGlassMinus} />
</button>
