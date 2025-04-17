<script lang="ts">
	import type { ModuleeResource } from '$lib/types/ModuleeResource';
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ProjectData } from '../ProjectData';
	import { downloadJson } from './downloadJson';

	interface Props {
		projectData: ProjectData;
	}

	const { projectData }: Props = $props();

	function handleClick() {
		const fileName = projectData.name + '.modulee.json';
		const resourceWithMetadata: ModuleeResource<ProjectData> = {
			type: 'project',
			data: projectData,
			isModuleeResource: true,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		downloadJson(resourceWithMetadata, fileName);
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa icon={faDownload} />
	Download project
</button>
