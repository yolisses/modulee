import type { ModuleType } from '$lib/project/ModuleType';

const MODULE_TYPE_OPTIONS = new Set<ModuleType>(['effect', 'instrument', 'utility']);

export function getIsModuleType(value: string): value is ModuleType {
	return MODULE_TYPE_OPTIONS.has(value as ModuleType);
}
