export type ModuleeResource<T, S> = {
	data: T;
	type: S;
	createdAt: string;
	updatedAt: string;
	isModuleeResource: true;
};
