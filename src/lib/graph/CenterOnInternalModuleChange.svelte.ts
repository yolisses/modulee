import { getRequiredContext } from '$lib/global/getRequiredContext';
import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
import type { Node } from '$lib/node/Node.svelte';
import { zoomContextKey } from '$lib/space/zoom/zoomContext';
import { tick, untrack } from 'svelte';
import { getElementSize } from './getElementSize';
import { getNodesAveragePosition } from './getNodesAveragePosition';
import type { GraphSizer } from './GraphSizer.svelte';

export class CenterOnInternalModuleChange {
	internalModuleIdContext = getRequiredContext(internalModuleIdContextKey);
	zoomContext = getRequiredContext(zoomContextKey);

	constructor(
		public graphSizer: GraphSizer,
		public nodes: Node[],
	) {
		$effect(() => {
			// Only runs when internalModuleId changes
			if (this.internalModuleIdContext.internalModuleId) {
				untrack(() => {
					// Wait for DOM updates
					tick().then(() => {
						this.autoScroll();
					});
				});
			}
		});
	}

	autoScroll() {
		if (this.nodes.length === 0) return;

		const { scrollArea } = this.graphSizer;
		if (!scrollArea) return;

		const { minPosition } = this.graphSizer;
		if (!minPosition) return;

		const scrollAreaSize = getElementSize(scrollArea);
		const averagePosition = getNodesAveragePosition(this.nodes);
		const scrollPosition = averagePosition
			.subtract(minPosition)
			.multiplyByNumber(this.zoomContext.zoom)
			.subtract(scrollAreaSize.divideByNumber(2));
		scrollArea.scrollTo({ top: scrollPosition.y, left: scrollPosition.x });
	}
}
