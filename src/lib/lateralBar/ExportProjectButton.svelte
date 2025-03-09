<script lang="ts">
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faFileExport } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { downloadJson } from './downloadJson';

	const projectDataContext = getProjectDataContext();

	function handleClick() {
		const { projectData } = projectDataContext;
		const fileName = projectData.name + '.modulee';
		downloadJson(projectData, fileName);
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa icon={faFileExport} />
	Export group
</button>
