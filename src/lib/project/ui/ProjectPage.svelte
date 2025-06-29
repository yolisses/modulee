<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import type { ProjectData } from '../data/ProjectData';
	import { getProjectNavbarSelectionContext } from '../projectNavbarSelectionContext';
	import CreateExternalModuleButton from './ui/CreateExternalModuleButton.svelte';
	import ProjectForm from './ui/ProjectForm.svelte';

	interface Props {
		projectData: ProjectData;
	}

	const { projectData }: Props = $props();

	const projectNavbarSelectionContext = getProjectNavbarSelectionContext();
	projectNavbarSelectionContext.projectNavbarSelection = 'project';
</script>

<ListPageLayout title="Project">
	<div class="flex flex-col items-stretch gap-2">
		<ProjectForm {projectData} />
		<hr class="mt-8 opacity-10" />
		<CreateExternalModuleButton {projectData} />
	</div>
</ListPageLayout>
