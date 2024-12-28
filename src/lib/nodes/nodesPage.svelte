<script lang="ts">
	import type { Node } from '$lib/types/node';
	import NodeList from './nodeList.svelte';

	const nodes: Node[] = [
		{ id: '0', x: 0, y: 0 },
		{ id: '1', x: 1, y: 1 },
		{ id: '2', x: 2, y: 2 }
	];
</script>

<NodeList {nodes} />
