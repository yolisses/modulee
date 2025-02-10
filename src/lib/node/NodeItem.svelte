<script lang="ts">
	import { ConnectorCondition } from '$lib/connector/ConnectorCondition.js';
	import InputItem from '$lib/connector/InputItem.svelte';
	import { getSpaceContext } from '$lib/space/spaceContext.js';
	import {
		NodeItem as BaseNodeItem,
		ConnectorAreaPointerStrategy,
		getSelectedNodeIdsContext,
		PointerEventDispatcher,
	} from 'nodes-editor';
	import type { Snippet } from 'svelte';
	import type { Node } from '../data/Node.svelte.js';
	import NodeItemHeader from './NodeItemHeader.svelte';

	interface Props {
		node: Node;
		children?: Snippet;
	}

	const { node, children }: Props = $props();
	const spaceContext = getSpaceContext();

	const selectedNodeIdsContext = getSelectedNodeIdsContext();
	const isSelected = $derived(selectedNodeIdsContext.selectedNodeIds.has(node.id));
	const screenPosition = $derived(spaceContext.space.getScreenPosition(node.position));

	const connectorId = node.output.id;
	const connectorCondition = new ConnectorCondition();
	const connectorAreaPointerStrategy = new ConnectorAreaPointerStrategy(
		connectorId,
		connectorCondition.endConnectorCondition,
	);
</script>

<PointerEventDispatcher pointerStrategy={connectorAreaPointerStrategy}>
	<BaseNodeItem {node} position={screenPosition}>
		<div
			style:width="4lh"
			style:outline-width="0.1lh"
			style:border-radius="0.4lh"
			class:outline-blue-500={isSelected}
			class:outline-zinc-700={!isSelected}
			class="flex flex-col bg-zinc-600 outline"
		>
			<NodeItemHeader {node} />

			{#each node.inputs as input (input.name)}
				<InputItem {input} />
			{/each}

			{@render children?.()}
		</div>
	</BaseNodeItem>
</PointerEventDispatcher>
