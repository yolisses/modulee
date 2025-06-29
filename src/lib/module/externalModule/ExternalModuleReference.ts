// TODO rename id to moduleId to make clear it's just a reference, not the
// reference own id
export type ExternalModuleReference = {
	type: 'external';
	moduleId: string;
};
