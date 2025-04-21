<script>
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const projectDataContext = getProjectDataContext();
</script>

<a href="/projects/{projectDataContext.projectData.id}/externalModules" class="common-button">
	<Fa icon={faSearch} />
	Search for external module
</a>
