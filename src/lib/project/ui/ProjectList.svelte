<script lang="ts">
	import BasicList from '$lib/ui/BasicList.svelte';
	import DotsMenuButton from '$lib/ui/DotsMenuButton.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';
	import type { ProjectData } from '../data/ProjectData';
	import DownloadProjectButton from '../download/DownloadProjectButton.svelte';
	import DeleteProjectButton from './DeleteProjectButton.svelte';
	import RenameProjectButton from './RenameProjectButton.svelte';

	interface Props {
		projectsData: ProjectData[];
	}

	const { projectsData }: Props = $props();

	function getHref(projectData: ProjectData) {
		return `/projects/${projectData.id}/graph`;
	}
</script>

{#if projectsData.length === 0}
	<div class="opacity-50">Use the create project button to make something</div>
{:else}
	<BasicList items={projectsData} {getId} {getName} disableSorting {getHref}>
		{#snippet buttons({ item: projectData })}
			<DotsMenuButton>
				<RenameProjectButton {projectData} />
				<DeleteProjectButton {projectData} />
				<DownloadProjectButton {projectData} />
			</DotsMenuButton>
		{/snippet}
	</BasicList>
{/if}
