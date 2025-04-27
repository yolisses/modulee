<script lang="ts">
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ProjectData } from '../ProjectData';
	import { createModuleeResource } from './createModuleeResource';
	import { downloadJson } from './downloadJson';

	interface Props {
		projectData: ProjectData;
	}

	const { projectData }: Props = $props();

	function handleClick() {
		const fileName = projectData.name + '.modulee.json';
		const moduleeResource = createModuleeResource(projectData, 'project');
		downloadJson(moduleeResource, fileName);
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa fw icon={faDownload} />
	Download project
</button>
