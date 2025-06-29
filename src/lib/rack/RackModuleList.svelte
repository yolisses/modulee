<script lang="ts">
	import { expandById } from '$lib/array/expandById';
	import type { TopologicalMap } from '$lib/connection/TopologicalMap';
	import type { ModuleNode } from '$lib/node/ModuleNode.svelte';
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';
	import ChainDivision from './ChainDivision.svelte';
	import { getChains } from './getChains';
	import { hideDraggingImage } from './hideDraggingImage';
	import RackModuleNodeItem from './RackModuleNodeItem.svelte';

	interface Props {
		moduleNodes: ModuleNode[];
	}

	let element = $state<HTMLElement>();
	const { moduleNodes }: Props = $props();
	// moduleNodes have to be topologically sorted

	function getAudioTopologicalMap(moduleNodes: ModuleNode[]) {
		const graph: TopologicalMap = new Map();
		moduleNodes.forEach((moduleNode) => {
			const inputs = [];
			const targetNodeId = moduleNode.audioInput?.targetNode?.id;
			if (targetNodeId && moduleNodes.some((moduleNode) => moduleNode.id === targetNodeId)) {
				inputs.push(targetNodeId);
			}
			graph.set(moduleNode.id, inputs);
		});
		return graph;
	}

	const idChains = getChains(getAudioTopologicalMap(moduleNodes));
	const chains = idChains.map((idChain) => expandById(moduleNodes, idChain));

	onMount(() => {
		if (element) {
			const sortable = new Sortable(element, {
				setData: hideDraggingImage,
				handle: '.sortable-handle',
				ghostClass: 'sortable-ghost',
			});
			return () => sortable.destroy();
		}
	});
</script>

<div class="flex flex-row flex-wrap justify-center gap-1 p-1" bind:this={element}>
	{#each chains as chain, index}
		{#each chain as moduleNode (moduleNode.id)}
			<RackModuleNodeItem {moduleNode} />
		{/each}
		{#if index < chains.length - 1}
			<ChainDivision />
		{/if}
	{/each}
</div>
