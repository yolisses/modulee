<script lang="ts">
	import { createId } from '$lib/data/createId';
	import type { ExternalModuleData } from '$lib/module/ExternalModuleData';
	import { getExternalModulesRepository } from '$lib/module/getExternalModulesRepository';
	import type { ProjectData } from './ProjectData';

	interface Props {
		projectData: ProjectData;
	}

	const { projectData }: Props = $props();

	function handleClick() {
		const externalModuleData: ExternalModuleData = {
			id: createId(),
			name: projectData.name,
			projectId: projectData.id,
			version: { major: 0, minor: 1, patch: 0 },
			graph: structuredClone(projectData.graphData),
		};
		const externalModulesRepository = getExternalModulesRepository();
		externalModulesRepository.addExternalModule(externalModuleData);
	}
</script>

<button class="common-button" onclick={handleClick}> Create module </button>
