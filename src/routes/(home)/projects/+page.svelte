<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { homeNavbarSelectionContextKey } from '$lib/home/homeNavbarSelectionContext';
	import ProjectsPage from '$lib/project/ui/ProjectsPage.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();

	getRequiredContext(homeNavbarSelectionContextKey).homeNavbarSelection = 'projects';
</script>

<ProjectsPage projectsData={data.projects} />
