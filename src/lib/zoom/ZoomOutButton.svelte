<script lang="ts">
	import { getShortcutStringForCommandType } from '$lib/editor/getShortcutStringForCommandType.svelte';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { contextsContextKey } from '$lib/shortcut/contextsContext';
	import { ZoomOutCommand } from '$lib/space/zoom/ZoomOutCommand';
	import { faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const contextsContext = getRequiredContext(contextsContextKey);

	function handleClick() {
		const command = new ZoomOutCommand();
		command.execute(contextsContext.contexts);
	}

	const shortcutString = getShortcutStringForCommandType('ZoomOutCommand');
</script>

<button class="common-button" onclick={handleClick} title="Zoom out {shortcutString}">
	<Fa fw icon={faMagnifyingGlassMinus} />
</button>
