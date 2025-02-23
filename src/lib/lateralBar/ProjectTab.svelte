<script lang="ts">
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { getProjectsRepositoryContext } from '$lib/project/projectsRepositoryContext';
	import type { InputBlurEvent } from '$lib/utils/InputBlurEvent';

	const projectDataContext = getProjectDataContext();
	const projectsRepositoryContext = getProjectsRepositoryContext();

	function handleBlur(e: InputBlurEvent) {
		const { projectsRepository } = projectsRepositoryContext;
		if (!projectsRepository) return;

		const { projectData } = projectDataContext;
		if (!projectData) return;

		const value = e.currentTarget.value;
		projectsRepository.renameProject(projectData.id, value);
	}
</script>

<!-- TODO consider renaming this component to ProjectPage -->

<div class="flex flex-col items-stretch gap-2 p-2">
	<label class="flex flex-col">
		Name
		<input
			type="text"
			onblur={handleBlur}
			value={projectDataContext.projectData?.name}
			class="rounded border border-white/10 bg-transparent p-2"
		/>
	</label>
</div>
