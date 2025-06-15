export type ModuleeResource<D, S> = {
	data: D;
	type: S;
	createdAt: string;
	updatedAt: string;
	moduleeVersion: string;
	isModuleeResource: true;
};
