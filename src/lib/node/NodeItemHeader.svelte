<script lang="ts">
	import type { Node } from './Node.svelte';

	const { node }: { node: Node } = $props();
</script>

<div class="flex-row">
	<!-- TODO change to node.type -->
	{node.id}
</div>
