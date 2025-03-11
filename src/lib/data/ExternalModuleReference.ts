import type { Version } from '$lib/module/Version';

// TODO rename id to moduleId to make clear it's just a reference, not the
// reference own id
export type ExternalModuleReference = {
	id: string;
	type: 'external';
	version: Version;
};
