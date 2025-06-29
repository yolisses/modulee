<script>
	import { getProjectDataContext } from '$lib/project/ui/projectDataContext';
	import ProjectPage from '$lib/project/ui/ProjectPage.svelte';

	const projectDataContext = getProjectDataContext();
</script>

<ProjectPage projectData={projectDataContext.projectData} />
