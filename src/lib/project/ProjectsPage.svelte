<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import Spinner from '$lib/ui/Spinner.svelte';
	import CreateProjectButton from './CreateProjectButton.svelte';
	import { getProjectsRepository } from './getProjectsRepository';
	import ProjectList from './ProjectList.svelte';
	import ImportProjectButton from './upload/UploadProjectButton.svelte';

	const projectsRepository = getProjectsRepository();

	let projectsDataPromise = $state(projectsRepository.getProjects());
	projectsRepository.onProjectsChange = () => {
		projectsDataPromise = projectsRepository.getProjects();
	};
</script>

<ListPageLayout title="Projects">
	{#snippet topChildren()}
		<ImportProjectButton />
		<CreateProjectButton />
	{/snippet}
	{#snippet children()}
		{#await projectsDataPromise}
			<div class="flex h-full flex-1 flex-col items-center p-8">
				<Spinner></Spinner>
			</div>
		{:then projectsData}
			<ProjectList {projectsData} />
		{:catch error}
			<div class="text-red-500">
				<div>It was not possible to load the projects</div>
				<div>{error}</div>
			</div>
		{/await}
	{/snippet}
</ListPageLayout>
