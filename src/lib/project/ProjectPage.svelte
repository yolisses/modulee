<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import CreateExternalModuleButton from './CreateExternalModuleButton.svelte';
	import type { ProjectData } from './ProjectData';
	import ProjectForm from './ProjectForm.svelte';
	import { getProjectNavbarSelectionContext } from './projectNavbarSelectionContext';

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
