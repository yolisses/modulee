<script lang="ts">
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';
	import CreateExternalModuleButton from './CreateExternalModuleButton.svelte';
	import DeleteProjectButton from './DeleteProjectButton.svelte';
	import DotsMenuButton from './DotsMenuButton.svelte';
	import DownloadProjectButton from './download/DownloadProjectButton.svelte';
	import type { ProjectData } from './ProjectData';
	import RenameProjectButton from './RenameProjectButton.svelte';

	interface Props {
		projectsData: ProjectData[];
	}

	const { projectsData }: Props = $props();

	function getHref(projectData: ProjectData) {
		return (
			'/projects/' +
			projectData.id +
			'/internalModules/' +
			projectData.graphData.mainInternalModuleId +
			'/nodes'
		);
	}
</script>

<BasicList values={projectsData} {getId} {getName} {getHref}>
	{#snippet buttons(value)}
		<DotsMenuButton>
			<RenameProjectButton projectData={value} />
			<DeleteProjectButton projectId={value.id} />
			<DownloadProjectButton projectData={value} />
			<CreateExternalModuleButton projectData={value} />
		</DotsMenuButton>
	{/snippet}
</BasicList>
