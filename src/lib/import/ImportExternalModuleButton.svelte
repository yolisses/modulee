<script lang="ts">
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const projectDataContext = getProjectDataContext();
</script>

<a class="common-button" href="/projects/{projectDataContext.projectData.id}/externalModules">
	<Fa icon={faArrowCircleDown} />
	Import external module
</a>
