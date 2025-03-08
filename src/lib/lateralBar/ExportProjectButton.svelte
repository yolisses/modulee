<script lang="ts">
	import { getGraphDataContext } from '$lib/graph/graphDataContext';
	import { faFileExport } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { downloadSomeFile } from './downloadSomeFile';

	const graphDataContext = getGraphDataContext();

	function handleClick() {
		downloadSomeFile();
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa icon={faFileExport} />
	Export group
</button>
