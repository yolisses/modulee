<script lang="ts">
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';
	import DotsMenuButton from '../ui/DotsMenuButton.svelte';
	import DeleteProjectButton from './DeleteProjectButton.svelte';
	import DownloadProjectButton from './download/DownloadProjectButton.svelte';
	import type { ProjectData } from './ProjectData';
	import RenameProjectButton from './RenameProjectButton.svelte';

	interface Props {
		projectsData: ProjectData[];
	}

	const { projectsData }: Props = $props();

	function getHref(projectData: ProjectData) {
		return (
			'/projects/' +
			projectData.id +
			'/internalModules/' +
			projectData?.graph?.mainInternalModuleId +
			'/graph'
		);
	}
</script>

{#if projectsData.length === 0}
	<div class="opacity-50">Use the create project button to make something</div>
{:else}
	<BasicList items={projectsData} {getId} {getName} {getHref}>
		{#snippet buttons({ item })}
			<DotsMenuButton>
				<RenameProjectButton projectData={item} />
				<DeleteProjectButton projectId={item.id} />
				<DownloadProjectButton projectData={item} />
			</DotsMenuButton>
		{/snippet}
	</BasicList>
{/if}
