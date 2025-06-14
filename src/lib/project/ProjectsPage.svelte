<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import CreateProjectButton from './create/CreateProjectButton.svelte';
	import type { ProjectData } from './ProjectData';
	import ProjectList from './ProjectList.svelte';

	interface Props {
		projectsData: ProjectData[];
	}

	const { projectsData }: Props = $props();
</script>

<ListPageLayout title="Projects">
	{#snippet topChildren()}
		<CreateProjectButton />
	{/snippet}
	{#snippet children()}
		<ProjectList {projectsData} />
	{/snippet}
</ListPageLayout>
