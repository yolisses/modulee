<script lang="ts">
	import ExternalModulesPage from '$lib/module/externalModule/ExternalModulesPage.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<ExternalModulesPage externalModulesData={data.externalModulesData} />
