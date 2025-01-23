<script lang="ts">
	import type { ProjectData } from './ProjectData';

	interface Props {
		projectData: ProjectData;
	}

	const { projectData }: Props = $props();
</script>

<a href="/projects/{projectData.id}" class="common-button">
	{projectData.name}
</a>
