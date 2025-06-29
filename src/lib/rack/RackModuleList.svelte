<script lang="ts">
	import type { ModuleNode } from '$lib/node/ModuleNode.svelte';
	import Sortable from 'sortablejs';
	import { onMount } from 'svelte';
	import { hideDraggingImage } from './hideDraggingImage';
	import RackModuleNodeItem from './RackModuleNodeItem.svelte';

	interface Props {
		moduleNodes: ModuleNode[];
	}

	let element = $state<HTMLElement>();
	const { moduleNodes }: Props = $props();

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
	{#each moduleNodes as moduleNode (moduleNode.id)}
		<RackModuleNodeItem {moduleNode} />
	{/each}
</div>
