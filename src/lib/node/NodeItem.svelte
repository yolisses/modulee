<script lang="ts">
	import ConnectorJoint from '$lib/connector/ConnectorJoint.svelte';
	import { endConnectorCondition } from '$lib/connector/endConnectorCondition.js';
	import InputItem from '$lib/connector/InputItem.svelte';
	import { getSpaceContext } from '$lib/space/spaceContext.js';
	import { NodeItem as BaseNodeItem, ConnectorArea, getSelectedNodeIdsContext } from 'nodes-editor';
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
</script>

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
		<script lang="ts">
			import type { Input } from '$lib/data/Input.svelte.js';
			import { ConnectorArea } from 'nodes-editor';
			import ConnectorJoint from './ConnectorJoint.svelte';
			import { endConnectorCondition } from './endConnectorCondition.js';

			interface Props {
				input: Input;
			}

			const { input }: Props = $props();
		</script>

		<!-- TODO move it to other file -->
		<ConnectorArea connector={node.output} {endConnectorCondition}>
			<div class="relative flex flex-row items-center hover:bg-white/10">
				<ConnectorJoint connector={node.output} />
			</div>
		</ConnectorArea>

		{#each node.inputs as input (input.name)}
			<InputItem {input} />
		{/each}
		{@render children?.()}
	</div>
</BaseNodeItem>
