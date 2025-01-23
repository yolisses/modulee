<script lang="ts">
	import TextSearchInput from '$lib/effect/TextSearchInput.svelte';
	import type { ProjectData } from './ProjectData';
	import ProjectList from './ProjectList.svelte';

	interface Props {
		projectsData: ProjectData[];
	}

	const { projectsData }: Props = $props();
</script>

<div class="flex-row items-center justify-between border-b border-white/10">
	<h1 class="pl-2 text-lg font-medium">Projects</h1>
	<TextSearchInput />
</div>
<ProjectList {projectsData} />
