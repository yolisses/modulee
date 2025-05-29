<script lang="ts">
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import type { ExternalModuleData } from './ExternalModuleData';

	interface Props {
		externalModuleData: ExternalModuleData;
	}

	const { externalModuleData }: Props = $props();
	const projectDataContext = getProjectDataContext();
</script>

<ListPageLayout title={externalModuleData.name}>
	{#snippet badges()}
		<a
			class="rounded bg-white/10 px-2 text-sm"
			href="/projects/{projectDataContext.projectData.id}/externalModules"
		>
			External module
		</a>
	{/snippet}
	<div>
		<div>
			{externalModuleData.description}
		</div>
	</div>
</ListPageLayout>
