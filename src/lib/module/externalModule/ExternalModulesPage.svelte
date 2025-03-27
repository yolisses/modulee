<script lang="ts">
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

<div class="flex flex-col items-center">
	<div class="flex w-full max-w-xl flex-col gap-4 p-4">
		<div class="flex h-10 flex-row items-center justify-between gap-2">
			<h1 class="pl-2 text-xl font-medium">Modules</h1>
		</div>
		<div>
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
		</div>
	</div>
</div>
