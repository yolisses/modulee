<script lang="ts">
	import { getIsMutedContext } from '$lib/audio/isMutedContexts';
	import { getShortcutStringForCommandType } from '$lib/editor/getShortcutStringForCommandType.svelte';
	import { ToggleIsMuteActionCommand } from '$lib/node/actionCommands/ToggleIsMuteActionCommand';
	import { getContextsContext } from '$lib/shortcut/contextsContext';
	import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const isMutedContext = getIsMutedContext();
	const contextsContext = getContextsContext();

	function handleClick() {
		const actionCommand = new ToggleIsMuteActionCommand();
		actionCommand.execute(contextsContext.contexts);
	}

	const shortcutString = getShortcutStringForCommandType('ToggleIsMuteActionCommand');
</script>

<button
	class="common-button"
	onclick={handleClick}
	class:text-red-500={isMutedContext.isMuted}
	title={(isMutedContext.isMuted ? 'Unmute' : 'Mute') + ' ' + shortcutString}
>
	<Fa fw icon={isMutedContext.isMuted ? faVolumeMute : faVolumeUp} />
</button>
