import type { InternalModuleData } from '$lib/data/InternalModuleData';
import type { InternalModuleReference } from '$lib/data/InternalModuleReference';

export function getInternalModuleReference(
	internalModuleData: InternalModuleData,
): InternalModuleReference {
	return { id: internalModuleData.id, type: 'internal' };
}
