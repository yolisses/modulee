import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type ActivePitchesContext = {
	activePitches: Set<number>;
};

export const activePitchesContextKey = Symbol('activePitchesContextKey');

export function setActivePitchesContext(activePitchesContext: ActivePitchesContext) {
	setContext(activePitchesContextKey, activePitchesContext);
	updateContext(activePitchesContextKey);
}
