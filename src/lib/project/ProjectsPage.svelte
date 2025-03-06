<script lang="ts">
	import CreateProjectButton from './CreateProjectButton.svelte';
	import type { ProjectData } from './ProjectData';
	import ProjectList from './ProjectList.svelte';

	interface Props {
		projectsData: ProjectData[];
	}

	const { projectsData }: Props = $props();
</script>

<div class="flex flex-col items-center">
	<div class="flex w-full max-w-xl flex-col gap-4 p-4">
		<div class="flex flex-row items-center justify-between gap-2">
			<h1 class="pl-2 text-xl font-medium">Projects</h1>
			<div class="flex-1"></div>
			<CreateProjectButton />
		</div>
		<div>
			<ProjectList {projectsData} />
		</div>
	</div>
</div>
