<script lang="ts">
	import HomePageLayout from '$lib/home/HomePageLayout.svelte';
	import { getProjectsRepository } from '$lib/project/getProjectsRepository';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import ExportInternalModuleButton from './ExportProjectButton.svelte';

	const projectDataContext = getProjectDataContext();
	const projectsRepository = getProjectsRepository();

	function handleBlur(
		e: FocusEvent & {
			currentTarget: EventTarget & (HTMLTextAreaElement | HTMLInputElement);
		},
	) {
		const value = e.currentTarget.value;
		projectsRepository.renameProject(projectDataContext.projectData.id, value);
	}
</script>

<svelte:head>
	<title>{projectDataContext.projectData.name} - Modulee</title>
</svelte:head>
<HomePageLayout title="Project">
	<div class="flex flex-col items-stretch gap-2">
		<label class="flex flex-col">
			Name
			<input
				type="text"
				onblur={handleBlur}
				value={projectDataContext.projectData?.name}
				class="rounded border border-white/10 bg-transparent p-2"
			/>
		</label>
		<label class="flex flex-col">
			Description
			<textarea
				onblur={(e) => e}
				value={projectDataContext.projectData?.description}
				class="rounded border border-white/10 bg-transparent p-2"
			></textarea>
		</label>
		<ExportInternalModuleButton />
	</div>
</HomePageLayout>
