import type { EffectData } from '$lib/effect/EffectData';

export type InstrumentData = {
	id: string;
	name: string;
	effects: EffectData[];
};
