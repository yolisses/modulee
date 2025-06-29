<script lang="ts">
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';
	import DotsMenuButton from '../ui/DotsMenuButton.svelte';
	import DeleteProjectButton from './DeleteProjectButton.svelte';
	import DownloadProjectButton from './download/DownloadProjectButton.svelte';
	import { getProjectFriendlyPath } from './getProjectFriendlyPath';
	import type { ProjectData } from './ProjectData';
	import RenameProjectButton from './RenameProjectButton.svelte';

	interface Props {
		projectsData: ProjectData[];
	}

	const { projectsData }: Props = $props();
</script>

{#if projectsData.length === 0}
	<div class="opacity-50">Use the create project button to make something</div>
{:else}
	<BasicList items={projectsData} {getId} {getName} getHref={getProjectFriendlyPath}>
		{#snippet buttons({ item: projectData })}
			<DotsMenuButton>
				<RenameProjectButton {projectData} />
				<DeleteProjectButton {projectData} />
				<DownloadProjectButton {projectData} />
			</DotsMenuButton>
		{/snippet}
	</BasicList>
{/if}
