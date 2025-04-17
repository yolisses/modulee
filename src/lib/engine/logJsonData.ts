import sortJson from 'sort-json';

export function logJsonData(data: unknown) {
	const sortedInternalModulesEngineData = sortJson(data);
	const dataJson = JSON.stringify(sortedInternalModulesEngineData, undefined, 2);
	console.debug(dataJson);
}
