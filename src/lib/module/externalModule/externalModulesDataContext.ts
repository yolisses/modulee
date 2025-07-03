import { setContext } from 'svelte';
import type { ExternalModuleData } from './ExternalModuleData';

export type ExternalModulesDataContext = {
	externalModulesData: ExternalModuleData[];
};

export const externalModulesDataContextKey = Symbol('externalModulesDataContextKey');

export function setExternalModulesDataContext(
	externalModulesDataContext: ExternalModulesDataContext,
) {
	setContext(externalModulesDataContextKey, externalModulesDataContext);
}
