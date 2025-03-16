import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';
import type { ExternalModuleData } from './ExternalModuleData';

export type ExternalModulesDataContext = {
	externalModulesData: ExternalModuleData[];
};

const externalModulesDataContextKey = Symbol('externalModulesDataContextKey');

export function setExternalModulesDataContext(
	externalModulesDataContext: ExternalModulesDataContext,
) {
	setContext(externalModulesDataContextKey, externalModulesDataContext);
}

export function getExternalModulesDataContext() {
	return getContextOrThrow<ExternalModulesDataContext>(externalModulesDataContextKey);
}
