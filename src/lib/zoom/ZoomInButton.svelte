<script lang="ts">
	import { getShortcutStringForCommandType } from '$lib/editor/getShortcutStringForCommandType.svelte';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { contextsContextKey } from '$lib/shortcut/contextsContext';
	import { ZoomInCommand } from '$lib/space/zoom/ZoomInCommand';
	import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const contextsContext = getRequiredContext(contextsContextKey);

	function handleClick() {
		const command = new ZoomInCommand();
		command.execute(contextsContext.contexts);
	}

	const shortcutString = getShortcutStringForCommandType('ZoomInCommand');
</script>

<button class="common-button" onclick={handleClick} title="Zoom in {shortcutString}">
	<Fa fw icon={faMagnifyingGlassPlus} />
</button>
