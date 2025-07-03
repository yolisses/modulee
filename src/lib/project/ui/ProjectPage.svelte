<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import type { ProjectData } from '../data/ProjectData';
	import CreateExternalModuleButton from './CreateExternalModuleButton.svelte';
	import ProjectForm from './ProjectForm.svelte';

	interface Props {
		projectData: ProjectData;
	}

	const { projectData }: Props = $props();

	const projectNavbarSelectionContext = getRequiredContext(projectNavbarSelectionContextKey);
	projectNavbarSelectionContext.projectNavbarSelection = 'project';
</script>

<ListPageLayout title="Project">
	<div class="flex flex-col items-stretch gap-2">
		<ProjectForm {projectData} />
		<hr class="mt-8 opacity-10" />
		<CreateExternalModuleButton {projectData} />
	</div>
</ListPageLayout>
