<script lang="ts">
	import { nodeSize } from '$lib/dev/devNodeSize';
	import { getNodesMaxPosition } from '$lib/graph/getNodesMaxPosition';
	import { getNodesMinPosition } from '$lib/graph/getNodesMinPosition';
	import { Vector } from 'nodes-editor';
	import { Node } from './DevNode.svelte';
	import DevNodeItem from './DevNodeItem.svelte';

	let element = $state<HTMLElement>();
	let size = $state(new Vector(500, 500));
	let nodes = $state([new Node(new Vector(20, 30)), new Node(new Vector(80, 80))]);
	let minPosition = $state(nodes[0].position);
	let maxPosition = $state(nodes[0].position.addByNumber(nodeSize));

	$effect(() => {
		const newMinNodePosition = minPosition.min(getNodesMinPosition(nodes));
		const newMaxNodePosition = maxPosition.max(getNodesMaxPosition(nodes));

		if (minPosition.notEquals(newMinNodePosition)) {
			minPosition = newMinNodePosition;
		}
		if (maxPosition.notEquals(newMaxNodePosition)) {
			maxPosition = newMaxNodePosition;
		}

		size = maxPosition.subtract(minPosition).max(new Vector(500, 500));
	});

	$effect(() => {
		element?.scrollTo({
			top: minPosition.y,
			left: minPosition.x,
		});
	});
</script>

<div class="overflow-hidden">
	<div class="overflow-scroll" style:width="500px" style:height="500px" bind:this={element}>
		<div class="relative bg-gray-800" style:width={size.x + 'px'} style:height={size.y + 'px'}>
			{#each nodes as node}
				<DevNodeItem {node} {minPosition} />
			{/each}
		</div>
	</div>
</div>
{minPosition.toString()}
