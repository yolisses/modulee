<script lang="ts">
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';
	import CreateModuleButton from './CreateModuleButton.svelte';
	import DeleteProjectButton from './DeleteProjectButton.svelte';
	import type { ProjectData } from './ProjectData';
	import RenameProjectButton from './RenameProjectButton.svelte';

	interface Props {
		projectsData: ProjectData[];
	}

	const { projectsData }: Props = $props();

	function getHref(projectData: ProjectData) {
		return '/projects/' + projectData.id;
	}
</script>

<BasicList values={projectsData} {getId} {getName} {getHref}>
	{#snippet buttons(value)}
		<RenameProjectButton projectData={value} />
		<DeleteProjectButton projectId={value.id} />
		<CreateModuleButton projectData={value} />
	{/snippet}
</BasicList>
