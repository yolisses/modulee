import type { Version } from '$lib/module/Version';

export type ExternalModuleReference = {
	id: string;
	type: 'external';
	version: Version;
};
