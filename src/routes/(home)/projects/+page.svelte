<script lang="ts">
	import { getHomeNavbarSelectionContext } from '$lib/home/homeNavbarSelectionContext';
	import ProjectsPage from '$lib/project/ui/ProjectsPage.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();

	getHomeNavbarSelectionContext().homeNavbarSelection = 'projects';
</script>

<ProjectsPage projectsData={data.projects} />
