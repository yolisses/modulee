<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import CreateExternalModuleButton from './CreateExternalModuleButton.svelte';
	import type { ProjectData } from './ProjectData';
	import ProjectForm from './ProjectForm.svelte';

	interface Props {
		projectData: ProjectData;
	}

	const { projectData }: Props = $props();
</script>

<ListPageLayout title="Project">
	<div class="flex flex-col items-stretch gap-2">
		<ProjectForm {projectData} />
		<h2 class="mt-8 text-lg opacity-50">Export</h2>
		<hr class="opacity-10" />
		<CreateExternalModuleButton {projectData} />
	</div>
</ListPageLayout>
