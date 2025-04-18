import type { Version } from '$lib/module/externalModule/Version';

export type ModuleeResource<D, S> = {
	data: D;
	type: S;
	createdAt: string;
	updatedAt: string;
	isModuleeResource: true;
	moduleeVersion: Version;
};
