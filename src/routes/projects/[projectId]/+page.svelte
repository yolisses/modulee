<script>
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import ProjectPage from '$lib/project/ui/ProjectPage.svelte';

	const projectDataContext = getRequiredContext(projectDataContextKey);
</script>

<ProjectPage projectData={projectDataContext.projectData} />
