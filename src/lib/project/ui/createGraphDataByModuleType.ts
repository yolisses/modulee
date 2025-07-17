import type { GraphData } from '$lib/graph/GraphData';
import type { ModuleType } from '../ModuleType';
import { createEffectInitialGraphData } from './createEffectInitialGraphData';
import { createInstrumentInitialGraphData } from './createInstrumentInitialGraphData';

export function createGraphDataByModuleType(moduleType: ModuleType) {
	const options: Record<ModuleType, () => GraphData> = {
		instrument: createInstrumentInitialGraphData,
		effect: createEffectInitialGraphData,
	};

	return options[moduleType]();
}
