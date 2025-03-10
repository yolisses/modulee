import { sortJsonObjectKeys } from './sortJsonObjectKeys';

export function logJsonData(data: unknown) {
	const sortedInternalModulesEngineData = sortJsonObjectKeys(data);
	const dataJson = JSON.stringify(sortedInternalModulesEngineData, undefined, 2);
	console.debug(dataJson);
}
