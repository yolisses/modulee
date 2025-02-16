import type { GroupEngineData } from './GroupEngineData';

// TODO add mainGroupId
export type GraphEngineData = {
	main_group_id?: number;
	groups: GroupEngineData[];
};
