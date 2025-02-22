<script lang="ts">
	import { JuceProjectsRepository } from '$lib/project/JuceProjectsRepository';
	import ProjectsPage from '$lib/project/ProjectsPage.svelte';
	import type { ProjectsRepository } from '$lib/project/ProjectsRepository';

	const projectsRepository: ProjectsRepository = new JuceProjectsRepository();
</script>

<ProjectsPage {projectsRepository} />
