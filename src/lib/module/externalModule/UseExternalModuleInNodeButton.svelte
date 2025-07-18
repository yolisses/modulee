<script lang="ts">
	import { NotImplementedError } from '$lib/NotImplementedError';
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ExternalModuleData } from './ExternalModuleData';

	interface Props {
		useInNodeId: string;
		externalModuleData: ExternalModuleData;
	}

	const { useInNodeId, externalModuleData }: Props = $props();

	function handleClick() {
		throw new NotImplementedError();
	}
</script>

<button class="common-button center-content" onclick={handleClick}>
	<Fa icon={faDownload} />
	Use
</button>
