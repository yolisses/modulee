<script lang="ts">
	import { getGraphRegistryContext } from '$lib/graph/graphRegistryContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faFileExport } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { downloadJson } from './downloadJson';

	const graphRegistryContext = getGraphRegistryContext();
	const projectDataContext = getProjectDataContext();

	function handleClick() {
		const { projectData } = projectDataContext;

		// DEBUG
		// const fileName = projectData.name + '.modulee';
		const fileName = projectData.name + '.json';

		downloadJson(projectData, fileName);
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa icon={faFileExport} />
	Export group
</button>
