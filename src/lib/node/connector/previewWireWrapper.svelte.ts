import { Vector } from '$lib/space/Vector';
import type { Wire } from '$lib/wire/Wire';

export const previewWireWrapper = $state<{ previewWire?: Wire }>({
	previewWire: {
		startPosition: new Vector(13, 5),
		endPosition: new Vector(18, 12),
	},
});
