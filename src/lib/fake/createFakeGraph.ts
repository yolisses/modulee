import type { GraphData } from '$lib/graph/GraphData';
import type { ModuleType } from '../../generated/prisma/enums';
import { createFakeEffectGraph } from './createFakeEffectGraph';

export function createFakeGraph(moduleType: ModuleType): GraphData {
	// TODO create instrument and utility options
	return createFakeEffectGraph();
}
