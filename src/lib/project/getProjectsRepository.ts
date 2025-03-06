import { getHaveJuceSupport } from '$lib/engine/getHaveJuceSupport';
import { IndexedDBProjectsRepository } from './IndexedDBProjectsRepository.svelte';
import { JuceProjectsRepository } from './JuceProjectsRepository.svelte';
import type { ProjectsRepository } from './ProjectsRepository';

export function getProjectsRepository(): ProjectsRepository {
	if (getHaveJuceSupport()) {
		return new JuceProjectsRepository();
	} else {
		return new IndexedDBProjectsRepository();
	}
}
