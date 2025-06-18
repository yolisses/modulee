import type { GraphData } from '$lib/data/GraphData';
import type { ModuleType } from '../../generated/prisma/enums';
import { createFakeEffectGraph } from './createFakeEffectGraph';

export function createFakeGraph(moduleType: ModuleType): GraphData {
	// TODO create instrument and utility options
	return createFakeEffectGraph();
}
