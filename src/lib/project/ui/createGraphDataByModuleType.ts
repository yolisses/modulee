import type { GraphData } from '$lib/graph/GraphData';
import type { ModuleType } from '../ModuleType';
import { createEffectInitialGraphData } from './createEffectInitialGraphData';
import { createInstrumentInitialGraphData } from './createInstrumentInitialGraphData';
import { createUtilityInitialGraphData } from './createUtilityInitialGraphData';

export function createGraphDataByModuleType(moduleType: ModuleType) {
	const options: Record<ModuleType, () => GraphData> = {
		effect: createEffectInitialGraphData,
		instrument: createInstrumentInitialGraphData,
		utility: createUtilityInitialGraphData,
	};

	return options[moduleType]();
}
