<script lang="ts">
	import type { Node } from './Node';

	const { node }: { node: Node } = $props();
</script>

<div>
	<!-- TODO change to node.type -->
	{node.id}
</div>
