import type { EffectData } from '$lib/data/EffectData';

export type InstrumentData = {
	id: string;
	name: string;
	effects: EffectData[];
};
