import { getHaveJuceSupport } from '$lib/engine/getHaveJuceSupport';
import { IndexedDBProjectsRepository } from './IndexedDBProjectsRepository.svelte';
import { JuceProjectsRepository } from './JuceProjectsRepository.svelte';
import type { ProjectsRepository } from './ProjectsRepository';

type ProjectsRepositoryWrapper = {
	projectsRepository?: ProjectsRepository;
};

const projectsRepositoryWrapper: ProjectsRepositoryWrapper = {};

// This method uses a singleton to avoid multiple repositories initialization.
// It may or may not be a good choice. Usually a context would solve, but looks
// like the getContext in +page.svelte files is evaluated before the condition
// for showing the page in the +layout.svelte, making it hard to wait for the
// projectsRepository
export function getProjectsRepository(): ProjectsRepository {
	if (!projectsRepositoryWrapper.projectsRepository) {
		if (getHaveJuceSupport()) {
			projectsRepositoryWrapper.projectsRepository = new JuceProjectsRepository();
		} else {
			projectsRepositoryWrapper.projectsRepository = new IndexedDBProjectsRepository();
		}
	}

	return projectsRepositoryWrapper.projectsRepository;
}
