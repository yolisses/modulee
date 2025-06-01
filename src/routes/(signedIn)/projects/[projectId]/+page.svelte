<script>
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import ProjectPage from '$lib/project/ProjectPage.svelte';

	const projectDataContext = getProjectDataContext();
</script>

<ProjectPage projectData={projectDataContext.projectData} />
