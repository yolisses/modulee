<script lang="ts">
	import { ZoomOutCommand } from '$lib/space/zoom/ZoomOutCommand';
	import { getZoomContext } from '$lib/space/zoom/zoomContext';
	import { faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const zoomContext = getZoomContext();

	function handleClick() {
		const command = new ZoomOutCommand();
		command.execute({ zoomContext });
	}
</script>

<button class="common-button" onclick={handleClick} title="Zoom out">
	<Fa icon={faMagnifyingGlassMinus} />
</button>
