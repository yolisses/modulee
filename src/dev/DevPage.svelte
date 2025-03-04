<script lang="ts">
	import { createId } from '$lib/data/createId';
	import { getGraphContext, setGraphContext } from '$lib/data/graphContext.svelte';
	import { ById } from '$lib/editor/ById';
	import { setGraphDataContext, type GraphDataContext } from '$lib/graph/graphDataContext';

	const test1 = $state({
		a: { b: { c: {} } },
	});

	const groups = $state({});
	const graphDataContext: GraphDataContext = $state({
		graphData: {
			mainGroupId: '1',
			nodes: new ById({}),
			groups: new ById(groups),
			connections: new ById({}),
		},
	});
	setGraphDataContext(graphDataContext);

	setGraphContext();
	const graphContext = getGraphContext();

	function handleClick() {
		// graphDataContext.graphData = {
		// 	connections: new ById(),
		// 	nodes: new ById(),
		// 	groups: new ById(),
		// 	mainGroupId: createId(),
		// };
		graphDataContext.graphData.groups.add({ id: createId(), name: 'test' });
		// graphDataContext.graphData = cloneGraphData(graphDataContext.graphData);
		console.log(graphDataContext.graphData.groups.values().length);
		test1.a.b.c[createId()] = 1;
	}
</script>

<button onclick={handleClick}>click me</button>
<div>hello, dev</div>
<div>
	{JSON.stringify(graphDataContext.graphData.groups, undefined, 2)}
</div>
<div>
	{JSON.stringify(graphContext.graph.groups, undefined, 2)}
</div>
<div>
	{graphDataContext.graphData.groups.values().length}
</div>
<div>
	{graphDataContext.graphData.mainGroupId}
</div>
<div>{JSON.stringify(test1.a.b.c, undefined, 2)}</div>
