import type { GraphData } from '$lib/data/GraphData';
import type { ModuleType } from '$lib/project/ModuleType';
import type { UserData } from '$lib/user/UserData';

export type ExternalModuleData<T extends ModuleType = ModuleType> = {
	id: string;
	name: string;
	moduleType: T;
	user: UserData;
	userId: string;
	graph: GraphData;
	projectId: string;
	likeCount: number;
	updatedAt: string;
	createdAt: string;
	description?: string;
};
