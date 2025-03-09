<script lang="ts">
	import { createId } from '$lib/data/createId';
	import { getModulesRepository } from '$lib/module/getModulesRepository';
	import type { ModuleData } from '$lib/module/ModuleData';
	import type { ProjectData } from './ProjectData';

	interface Props {
		projectData: ProjectData;
	}

	const { projectData }: Props = $props();

	function handleClick() {
		const moduleData: ModuleData = {
			id: createId(),
			name: projectData.name,
			projectId: projectData.id,
			version: { major: 0, minor: 1, patch: 0 },
			graph: structuredClone(projectData.graphData),
		};
		const modulesRepository = getModulesRepository();
		modulesRepository.addModule(moduleData);
	}
</script>

<button class="common-button" onclick={handleClick}> Create module </button>
