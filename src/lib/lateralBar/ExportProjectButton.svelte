<script lang="ts">
	import { getGraphDataContext } from '$lib/graph/graphDataContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faFileExport } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { downloadJson } from './downloadJson';

	const graphDataContext = getGraphDataContext();
	const projectDataContext = getProjectDataContext();

	function handleClick() {
		const object = { ...projectDataContext.projectData };
		delete object['commands'];
		downloadJson(object, projectDataContext.projectData.name + '.modulee');
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa icon={faFileExport} />
	Export group
</button>
