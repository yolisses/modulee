<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import CreateExternalModuleButton from './CreateExternalModuleButton.svelte';
	import DownloadProjectButton from './download/DownloadProjectButton.svelte';
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
		<div class="flex flex-col">
			<DownloadProjectButton {projectData} />
			<CreateExternalModuleButton {projectData} />
		</div>
	</div>
</ListPageLayout>
