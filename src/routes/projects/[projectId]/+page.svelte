<script>
	import ProjectPage from '$lib/project/ProjectPage.svelte';
	import { getProjectDataContext } from '$lib/project/ui/projectDataContextext';

	const projectDataContext = getProjectDataContext();
</script>

<ProjectPage projectData={projectDataContext.projectData} />
