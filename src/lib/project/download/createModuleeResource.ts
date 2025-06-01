import type { ModuleeResource } from '$lib/global/ModuleeResource';
import { MODULEE_VERSION } from './MODULEE_VERSION';

export function createModuleeResource<D, S>(data: D, type: S): ModuleeResource<D, S> {
	return {
		data,
		type,
		isModuleeResource: true,
		moduleeVersion: MODULEE_VERSION,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
}
