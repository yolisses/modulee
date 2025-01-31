<script lang="ts">
	import { LocalProjectsRepository } from '$lib/project/LocalProjectsRepository';
	import type { ProjectData } from '$lib/project/ProjectData';
	import ProjectPage from '$lib/project/ProjectPage.svelte';
	import Spinner from '$lib/ui/Spinner.svelte';
	import { doNothing } from '$lib/utils/doNothing';
	import { onMount, type Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	const { data, children }: Props = $props();
	const projectsRepository = new LocalProjectsRepository();

	// This way to load data from the browser may be overcomplicated. It was
	// chosen simply to use the standard await block
	let projectDataPromise = $state<Promise<ProjectData>>(new Promise(doNothing));

	onMount(() => {
		projectDataPromise = new Promise(async (resolve) => {
			await projectsRepository.initialize();
			const projectData = await projectsRepository.getProject(data.projectId);
			resolve(projectData);
		});
	});
</script>

{#await projectDataPromise}
	<div class="h-full w-full items-center justify-center">
		<Spinner />
	</div>
{:then projectData}
	<ProjectPage {projectData} {projectsRepository}>
		{@render children?.()}
	</ProjectPage>
{/await}
