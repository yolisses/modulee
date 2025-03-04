<script lang="ts">
	import { createId } from '$lib/data/createId';
	import { Graph } from '$lib/data/Graph.svelte';
	import type { GraphData } from '$lib/data/GraphData';
	import type { GroupData } from '$lib/data/GroupData';
	import { ById } from '$lib/editor/ById';

	const groupsContent = $state<Record<string, GroupData>>({});

	const graphData = $state<GraphData>({
		nodes: new ById(),
		connections: new ById(),
		groups: new ById(groupsContent),
		mainGroupId: '1',
	});

	const graph = new Graph(graphData);

	function handleClick() {
		graphData.groups.add({
			id: createId(),
			name: '1',
		});
	}
</script>

<div class="flex flex-col gap-2">
	<button onclick={handleClick}>click me</button>
	<div>{JSON.stringify(graphData)}</div>
	<div>{JSON.stringify(new Graph(graphData))}</div>
</div>
