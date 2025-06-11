import type { GraphData } from '$lib/data/GraphData';
import type { UserData } from '$lib/user/UserData';
import type { ModuleType } from '../../../generated/prisma';
import type { Version } from './Version';

export type ExternalModuleData<T extends ModuleType> = {
	id: string;
	name: string;
	moduleType: T;
	user: UserData;
	userId: string;
	graph: GraphData;
	version: Version;
	projectId: string;
	likeCount: number;
	updatedAt: string;
	createdAt: string;
	usageCount: number;
	description?: string;
};
