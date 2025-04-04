<script lang="ts">
	import HomePageLayout from '$lib/ui/HomePageLayout.svelte';
	import type { ExternalModuleData } from './ExternalModuleData';
	import ExternalModuleList from './ExternalModuleList.svelte';
	import { getExternalModulesRepository } from './getExternalModulesRepository';

	interface Props {
		externalModulesData: ExternalModuleData[];
	}

	const { externalModulesData }: Props = $props();

	const externalModulesRepository = getExternalModulesRepository();

	let externalModulesDataPromise = $state(externalModulesRepository.getExternalModules());
</script>

<HomePageLayout title="Modules">
	{#snippet children()}
		<ExternalModuleList {externalModulesData} />
		<!-- {#await externalModulesDataPromise}
				<div class="flex h-full flex-1 flex-col items-center p-8">
					<Spinner></Spinner>
				</div>
			{:then externalModulesData}
				<ExternalModuleList {externalModulesData} />
			{:catch error}
				<div class="text-red-500">
					<div>It was not possible to load the external modules</div>
					<div>{error}</div>
				</div>
			{/await} -->
	{/snippet}
</HomePageLayout>
