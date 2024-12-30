<script lang="ts">
	import type { Node } from './Node.svelte';

	const { node }: { node: Node } = $props();
</script>

<div class="flex-row" style="padding-inline: 0.5em;">
	<!-- TODO change to node.type -->
	{node.id.slice(0, 6)}
</div>
