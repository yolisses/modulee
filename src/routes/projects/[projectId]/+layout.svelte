<script lang="ts">
	import type { ProjectData } from '$lib/project/ProjectData';
	import { setProjectDataContext, type ProjectDataContext } from '$lib/project/projectDataContext';
	import ProjectPage from '$lib/project/ProjectPage.svelte';
	import { getProjectsRepositoryContext } from '$lib/project/projectsRepositoryContext';
	import Spinner from '$lib/ui/Spinner.svelte';
	import { type Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
		children: Snippet;
	}

	const { data, children }: Props = $props();

	let projectData = $state.raw<ProjectData>();

	const projectDataContext: ProjectDataContext = $state({});
	setProjectDataContext(projectDataContext);

	const projectsRepositoryContext = getProjectsRepositoryContext();

	$effect(() => {
		const { projectsRepository } = projectsRepositoryContext;
		if (!projectsRepository) return;
		if (!projectsRepository.getIsInitialized()) return;
		projectsRepository.getProject(data.projectId).then((data) => {
			projectData = data;
		});
	});
</script>

{#if projectData}
	<ProjectPage {projectData}>
		{@render children?.()}
	</ProjectPage>
{:else}
	<div class="fixed inset-0 flex items-center justify-center">
		<Spinner />
	</div>
{/if}
