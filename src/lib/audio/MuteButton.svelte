<script lang="ts">
	import { getIsMutedContext } from '$lib/engine/isMutedContexts';
	import { ToggleIsMuteActionCommand } from '$lib/node/actionCommands/ToggleIsMuteActionCommand';
	import type { Contexts } from '$lib/shortcut/contexts';
	import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const isMutedContext = getIsMutedContext();

	function handleClick() {
		const actionCommand = new ToggleIsMuteActionCommand();
		// TODO find a more type safe way of doing this
		actionCommand.execute({ isMutedContext } as Contexts);
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
