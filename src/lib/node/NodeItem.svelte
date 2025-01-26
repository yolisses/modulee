<script lang="ts">
	import ConnectionItem from '$lib/connection/ConnectionItem.svelte';
	import InputItem from '$lib/connector/InputItem.svelte';
	import OutputItem from '$lib/connector/OutputItem.svelte';
	import type { Editor } from '$lib/editor/Editor.svelte.js';
	import type { Space } from '$lib/space/Space.js';
	import { NodeItem as BaseNodeItem } from 'nodes-editor';
	import type { Node } from '../data/Node.svelte.js';
	import NodeItemHeader from './NodeItemHeader.svelte';

	interface Props {
		node: Node;
		space: Space;
		editor: Editor;
		projectId: string;
	}

	const { node, space, editor, projectId }: Props = $props();

	const screenPosition = $derived(space.getScreenPosition(node.position));
</script>

<BaseNodeItem position={screenPosition}>
	<div
		style:outline-width="0.1lh"
		style:border-radius="0.4lh"
		class="flex flex-col break-words bg-zinc-600 outline outline-zinc-700"
	>
		<NodeItemHeader {node} {space} {editor} {projectId} />
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
	<ConnectionItem {input} {space} />
{/each}
