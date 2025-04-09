<script lang="ts">
	import type { ProjectData } from './ProjectData';

	interface Props {
		projectData: ProjectData;
	}

	const { projectData }: Props = $props();
</script>

<form action="/externalModules/create" method="post">
	<input type="hidden" name="name" value={projectData.name} />
	<input type="hidden" name="projectId" value={projectData.id} />
	<input type="hidden" name="graph" value={JSON.stringify(projectData.graphData)} />
	<button class="common-button"> Create external module </button>
</form>
