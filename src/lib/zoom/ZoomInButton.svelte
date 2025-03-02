<script lang="ts">
	import { ZoomInCommand } from '$lib/space/zoom/ZoomInCommand';
	import { getZoomContext } from '$lib/space/zoom/zoomContext';
	import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const zoomContext = getZoomContext();

	function handleClick() {
		const command = new ZoomInCommand({ zoomContext });
		command.execute();
	}
</script>

<button class="common-button" onclick={handleClick} title="Zoom in">
	<Fa icon={faMagnifyingGlassPlus} />
</button>
