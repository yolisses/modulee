<script lang="ts">
	import { getGraphDataContext } from '$lib/graph/graphDataContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faFileExport } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { downloadJson } from './downloadJson';
	import { getProjectDataV2 } from './getProjectDataV2.svelte';

	const graphDataContext = getGraphDataContext();
	const projectDataContext = getProjectDataContext();

	function handleClick() {
		const projectDataV2 = getProjectDataV2(
			projectDataContext.projectData,
			graphDataContext.graphData,
		);

		// DEBUG
		// const fileName = projectDataContext.projectData.name + '.modulee';

		const fileName = projectDataContext.projectData.name + '.json';
		downloadJson(projectDataV2, fileName);
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa icon={faFileExport} />
	Export group
</button>
