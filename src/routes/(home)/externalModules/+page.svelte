<script lang="ts">
	import ExternalModulesPage from '$lib/module/externalModule/ExternalModulesPage.svelte';
	import type { PageData } from './$types';

	const data: PageData = $props();
</script>

<ExternalModulesPage externalModulesData={data.externalModulesData} />
