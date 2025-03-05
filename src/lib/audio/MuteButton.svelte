<script lang="ts">
	import { getIsMutedContext } from '$lib/engine/isMutedContexts';
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
</script>

<button
	class="common-button"
	onclick={handleClick}
	class:text-red-500={isMutedContext.isMuted}
	title={isMutedContext.isMuted ? 'Unmute' : 'Mute'}
>
	<Fa icon={isMutedContext.isMuted ? faVolumeMute : faVolumeUp} />
</button>
