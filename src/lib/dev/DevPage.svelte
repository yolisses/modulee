<script lang="ts">
	import { Vector } from 'nodes-editor';
	import { Node } from './DevNode.svelte';
	import DevNodeItem from './DevNodeItem.svelte';
	import { GraphCanvasSizeHandler } from './GraphCanvasSizeHandler.svelte';

	let element = $state<HTMLElement>();
	let nodes = $state([new Node(new Vector(20, 30)), new Node(new Vector(80, 80))]);

	const graphCanvasSizeHandler = $derived(
		element ? new GraphCanvasSizeHandler(element) : undefined,
	);

	$effect(() => {
		graphCanvasSizeHandler?.handleNodesChange(nodes);
	});
</script>

<div class="overflow-hidden">
	<div class="resize overflow-scroll" bind:this={element}>
		{#if graphCanvasSizeHandler}
			<div
				class="bg-dots relative bg-gray-800"
				style:width={graphCanvasSizeHandler.size.x + 'px'}
				style:height={graphCanvasSizeHandler.size.y + 'px'}
			>
				{#each nodes as node}
					<DevNodeItem {node} offset={graphCanvasSizeHandler.offset} />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.bg-dots {
		background-size: 10px 10px;
		background-position: 5px 5px;
		background-image: radial-gradient(circle, #8884 0.05lh, rgba(0, 0, 0, 0) 0.05lh);
	}
</style>
