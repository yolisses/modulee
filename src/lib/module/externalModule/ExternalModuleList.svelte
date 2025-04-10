<script lang="ts">
	import type { ExternalModuleData } from './ExternalModuleData';

	interface Props {
		externalModulesData: ExternalModuleData[];
	}

	const { externalModulesData }: Props = $props();

	function getHref(externalModuleData: ExternalModuleData) {
		return '/externalModule/' + externalModuleData.id;
	}
</script>

{#each externalModulesData as externalModulesData}
	<div class="rounded-md p-2">
		<div class="block overflow-hidden text-ellipsis whitespace-nowrap">
			{externalModulesData.name}
		</div>
		<div class="block max-h-10 overflow-hidden text-ellipsis text-sm text-white/75">
			{externalModulesData.description}
		</div>
	</div>
{/each}
