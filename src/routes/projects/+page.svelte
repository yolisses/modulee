<script lang="ts">
	import ProjectsPage from '$lib/project/ProjectsPage.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
</script>

<ProjectsPage projectsData={data.projectsData} />
