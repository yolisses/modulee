<script lang="ts">
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ExternalModuleData } from './ExternalModuleData';

	interface Props {
		useInNodeId: string;
		externalModuleData: ExternalModuleData;
	}

	const { useInNodeId, externalModuleData }: Props = $props();

	function handleClick() {
		// TODO
	}
</script>

<button class="common-button center-content">
	<Fa icon={faDownload} />
	Use
</button>
