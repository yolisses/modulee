import { sortJsonObjectKeys } from './sortJsonObjectKeys';

export function logJsonData(data: unknown) {
	const sortedGroupsEngineData = sortJsonObjectKeys(data);
	const dataJson = JSON.stringify(sortedGroupsEngineData, undefined, 2);
	console.debug(dataJson);
}
