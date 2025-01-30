<script lang="ts">
	import ConnectionItem from '$lib/connection/ConnectionItem.svelte';
	import InputItem from '$lib/connector/InputItem.svelte';
	import OutputItem from '$lib/connector/OutputItem.svelte';
	import { getSpaceContext } from '$lib/space/spaceContext.js';
	import { NodeItem as BaseNodeItem, getSelectedNodeIdsContext } from 'nodes-editor';
	import type { Node } from '../data/Node.svelte.js';
	import NodeItemHeader from './NodeItemHeader.svelte';

	interface Props {
		node: Node;
	}

	const { node }: Props = $props();
	const spaceContext = getSpaceContext();

	const selectedNodeIdsContext = getSelectedNodeIdsContext();
	const isSelected = $derived(selectedNodeIdsContext.selectedNodeIds.has(node.id));
	const screenPosition = $derived(spaceContext.space.getScreenPosition(node.position));
</script>

<BaseNodeItem {node} position={screenPosition}>
	<div
		style:outline-width="0.1lh"
		style:border-radius="0.4lh"
		class:outline-blue-500={isSelected}
		class:outline-zinc-700={!isSelected}
		class="flex flex-col break-words bg-zinc-600 outline"
	>
		<NodeItemHeader {node} />
		{#each node.outputs as output (output.id)}
			<OutputItem {output} />
		{/each}
		{#each node.inputs as input (input.id)}
			<InputItem {input} />
		{/each}
	</div>
</BaseNodeItem>

<!-- This is here instead of in InputItem because inside BaseNodeItem there's
the node position offset -->
{#each node.inputs as input (input.id)}
	<ConnectionItem {input} />
{/each}
