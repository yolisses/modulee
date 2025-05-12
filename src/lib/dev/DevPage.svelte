<script lang="ts">
	import { nodeSize } from '$lib/dev/devNodeSize';
	import { getNodesMaxPosition } from '$lib/graph/getNodesMaxPosition';
	import { getNodesMinPosition } from '$lib/graph/getNodesMinPosition';
	import { Vector } from 'nodes-editor';
	import { Node } from './DevNode.svelte';
	import DevNodeItem from './DevNodeItem.svelte';

	let element = $state<HTMLElement>();
	let size = $state(new Vector(500, 500));
	let previousMinPosition = $state<Vector>();
	let previousMaxPosition = $state<Vector>();
	let nodes = $state([new Node(new Vector(20, 30)), new Node(new Vector(80, 80))]);
	let minPosition = $state(nodes[0].position);
	let maxPosition = $state(nodes[0].position.addByNumber(nodeSize));
	let difference = $state<Vector>();

	$effect(() => {
		const step = 100;
		const padding = 200;

		const newMinNodePosition = getNodesMinPosition(nodes)
			.divideByNumber(step)
			.floor()
			.multiplyByNumber(step)
			.subtractByNumber(padding);

		const newMaxNodePosition = getNodesMaxPosition(nodes)
			.divideByNumber(step)
			.ceil()
			.multiplyByNumber(step)
			.addByNumber(padding);

		if (!previousMinPosition || previousMinPosition.notEquals(newMinNodePosition)) {
			previousMinPosition = newMinNodePosition;
			difference = newMinNodePosition.subtract(minPosition);
			minPosition = minPosition.min(newMinNodePosition);
		}

		if (!previousMaxPosition || previousMaxPosition.notEquals(newMaxNodePosition)) {
			previousMaxPosition = newMaxNodePosition;
			maxPosition = maxPosition.max(newMaxNodePosition);
		}

		size = maxPosition.subtract(minPosition);
	});

	$effect(() => {
		if (difference) {
			element?.scrollBy({
				top: -difference.y,
				left: -difference.x,
			});
		}
	});
</script>

<div class="overflow-hidden">
	<div class="overflow-scroll" style:width="500px" style:height="500px" bind:this={element}>
		<div
			class="bg-dots relative bg-gray-800"
			style:width={size.x + 'px'}
			style:height={size.y + 'px'}
		>
			{#each nodes as node}
				<DevNodeItem {node} {minPosition} />
			{/each}
		</div>
	</div>
</div>
{minPosition.toString()}

<style lang="postcss">
	.bg-dots {
		background-size: 10px 10px;
		background-position: 5px 5px;
		background-image: radial-gradient(circle, #8884 0.05lh, rgba(0, 0, 0, 0) 0.05lh);
	}
</style>
