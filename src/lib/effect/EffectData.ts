import type { NodeData } from '$lib/node/data/NodeData';

export type EffectData = {
	id: string;
	name: string;
	nodes: NodeData[];
};
