<script lang="ts">
	import type { ProjectData } from './ProjectData';
	import ProjectItem from './ProjectItem.svelte';

	interface Props {
		projectsData: ProjectData[];
	}

	const { projectsData }: Props = $props();
</script>

{#each projectsData as projectData (projectData.id)}
	<ProjectItem {projectData} />
{/each}
