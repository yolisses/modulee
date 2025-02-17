<script lang="ts">
	import { getAudioBackendContext } from '$lib/engine/audioBackendContext';
	import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const audioBackendContext = getAudioBackendContext();
	let isMuted = $state(false);

	function handleClick() {
		const { audioBackend } = audioBackendContext;
		if (!audioBackend) return;
		isMuted = !isMuted;
		audioBackend.setIsMuted(isMuted);
	}
</script>

<button
	class="common-button"
	onclick={handleClick}
	class:text-red-500={isMuted}
	title={isMuted ? 'Unmute' : 'Mute'}
>
	<Fa icon={isMuted ? faVolumeMute : faVolumeUp} />
</button>
