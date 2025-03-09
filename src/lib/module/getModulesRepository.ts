import { IndexedDbModulesRepository } from './IndexedDbModulesRepository';
import type { ModulesRepository } from './ModulesRepository';

type ModulesRepositoryWrapper = {
	modulesRepository?: ModulesRepository;
};

const modulesRepositoryWrapper: ModulesRepositoryWrapper = {};

// This method uses a singleton to avoid multiple repositories initialization.
// It may or may not be a good choice. Usually a context would solve, but looks
// like the getContext in +page.svelte files is evaluated before the condition
// for showing the page in the +layout.svelte, making it hard to wait for the
// modulesRepository
export function getModulesRepository(): ModulesRepository {
	if (!modulesRepositoryWrapper.modulesRepository) {
		modulesRepositoryWrapper.modulesRepository = new IndexedDbModulesRepository();
	}

	return modulesRepositoryWrapper.modulesRepository;
}
