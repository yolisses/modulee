<script lang="ts">
	import type { Node } from '$lib/types/node';

	let { node }: { node: Node } = $props();
</script>

<div class="rounded border">
	{node.id}
</div>
