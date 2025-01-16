import type { NodeData } from '$lib/node/NodeData';

export type EffectData = {
	id: string;
	name: string;
	nodes: NodeData[];
};
