<script lang="ts">
	import { IndexedDBProjectsRepository } from '$lib/project/IndexedDBProjectsRepository';
	import ProjectsPage from '$lib/project/ProjectsPage.svelte';
	import type { ProjectsRepository } from '$lib/project/ProjectsRepository';

	const projectsRepository: ProjectsRepository = new IndexedDBProjectsRepository();
</script>

<ProjectsPage {projectsRepository} />
