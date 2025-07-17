import type { GraphData } from '$lib/graph/GraphData';
import type { ModuleType } from '../ModuleType';
import { createInstrumentInitialGraphData } from './createInstrumentInitialGraphData';

export function createGraphDataByModuleType(moduleType: ModuleType) {
	const options: Record<ModuleType, () => GraphData> = {
		instrument: createInstrumentInitialGraphData,
	};

	return options[moduleType]();
}
