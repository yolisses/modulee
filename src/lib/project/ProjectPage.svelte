<script lang="ts">
	import { getProjectsRepository } from '$lib/project/getProjectsRepository';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import DownloadProjectButton from './download/DownloadProjectButton.svelte';
	import type { ProjectData } from './ProjectData';

	interface Props {
		projectData: ProjectData;
	}

	const { projectData }: Props = $props();

	const projectsRepository = getProjectsRepository();

	function handleBlur(
		e: FocusEvent & {
			currentTarget: EventTarget & (HTMLTextAreaElement | HTMLInputElement);
		},
	) {
		const value = e.currentTarget.value;
		projectsRepository.renameProject(projectData.id, value);
	}
</script>

<ListPageLayout title="Project">
	<div class="flex flex-col items-stretch gap-2">
		<label class="flex flex-col">
			Name
			<input
				type="text"
				onblur={handleBlur}
				value={projectData.name}
				class="rounded border border-white/10 bg-transparent p-2"
			/>
		</label>
		<label class="flex flex-col">
			Description
			<textarea
				onblur={(e) => e}
				value={projectData.description}
				class="rounded border border-white/10 bg-transparent p-2"
			></textarea>
		</label>
		<DownloadProjectButton {projectData} />
	</div>
</ListPageLayout>
