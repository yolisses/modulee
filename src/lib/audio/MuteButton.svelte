<script lang="ts">
	import { getShortcutStringForCommandType } from '$lib/editor/getShortcutStringForCommandType.svelte';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { ToggleIsMuteActionCommand } from '$lib/node/actionCommands/ToggleIsMuteActionCommand';
	import { contextsContextKey } from '$lib/shortcut/contextsContext';
	import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { isMutedContextKey } from './isMutedContexts';

	const isMutedContext = getRequiredContext(isMutedContextKey);
	const contextsContext = getRequiredContext(contextsContextKey);

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
