<script lang="ts">
	import type { Node } from '../data/Node.svelte.js';
	import NodeItem from './NodeItem.svelte';

	interface Props {
		node: Node;
	}

	const { node }: Props = $props();

	function handleBlur(e: Event & { currentTarget: HTMLInputElement }) {}
</script>

<NodeItem {node}>
	<input
		type="number"
		class="bg-transparent text-right"
		bind:value={node.extras.value}
		onchange={handleBlur}
	/>
</NodeItem>
