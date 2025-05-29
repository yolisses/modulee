<script lang="ts">
	import ExternalModulePage from '$lib/module/externalModule/ExternalModulePage.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
</script>

<ExternalModulePage externalModuleData={data.externalModuleData} />
