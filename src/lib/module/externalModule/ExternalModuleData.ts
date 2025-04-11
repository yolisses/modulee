import type { GraphData } from '$lib/data/GraphData';
import type { UserData } from '$lib/user/UserData';
import type { Version } from './Version';

export type ExternalModuleData = {
	id: string;
	name: string;
	user: UserData;
	userId: string;
	graph: GraphData;
	version: Version;
	projectId: string;
	likeCount: number;
	usageCount: number;
	description?: string;
};
