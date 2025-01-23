<script lang="ts">
	import type { ProjectData } from './ProjectData';
	import ProjectList from './ProjectList.svelte';

	interface Props {
		projectsData: ProjectData[];
	}

	const { projectsData }: Props = $props();
</script>

<div>
	<h1 class="text-2xl">Projects</h1>
	<ProjectList {projectsData} />
</div>
