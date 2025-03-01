<script lang="ts">
	import { getZoomContext } from '$lib/ui/zoomContext';
	import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const zoomContext = getZoomContext();

	function handleClick() {
		zoomContext.zoom += 1;
	}
</script>

<button class="common-button" onclick={handleClick} title="Zoom in">
	<Fa icon={faMagnifyingGlassPlus} />
</button>
