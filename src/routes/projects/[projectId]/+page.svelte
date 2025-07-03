<script>
	import ProjectPage from '$lib/project/ui/ProjectPage.svelte';

	const projectDataContext = getRequiredContext(projectDataContextKey);
</script>

<ProjectPage projectData={projectDataContext.projectData} />
