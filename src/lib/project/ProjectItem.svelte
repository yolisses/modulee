<script lang="ts">
	import DeleteProjectButton from './DeleteProjectButton.svelte';
	import type { ProjectData } from './ProjectData';

	interface Props {
		projectData: ProjectData;
	}

	const { projectData }: Props = $props();
</script>

<div class="hover-bg flex flex-row items-stretch">
	<a href="/projects/{projectData.id}" class="flex-1 p-2">
		{projectData.name}
	</a>
	<DeleteProjectButton projectId={projectData.id} />
</div>
