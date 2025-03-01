<script lang="ts">
	import { getZoomContext } from '$lib/ui/zoomContext';
	import { faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const zoomContext = getZoomContext();

	function handleClick() {
		zoomContext.zoom -= 1;
	}
</script>

<button class="common-button" onclick={handleClick} title="Zoom out">
	<Fa icon={faMagnifyingGlassMinus} />
</button>
