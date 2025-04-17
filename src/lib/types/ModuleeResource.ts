export type ModuleeResource<T> = {
	data: T;
	type: 'project';
	createdAt: string;
	updatedAt: string;
	isModuleeResource: true;
};
