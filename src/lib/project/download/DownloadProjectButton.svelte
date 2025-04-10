<script lang="ts">
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ProjectData } from '../ProjectData';
	import { downloadJson } from './downloadJson';

	interface Props {
		projectData: ProjectData;
	}

	const { projectData }: Props = $props();

	function handleClick() {
		const fileName = projectData.name + '.modulee';
		downloadJson(projectData, fileName);
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa icon={faDownload} />
	Download project
</button>
