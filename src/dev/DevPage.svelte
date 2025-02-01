<script lang="ts">
	import type { InputData } from '$lib/data/InputData';
	import { Node } from '$lib/data/Node.svelte';
	import type { NodeData } from '$lib/data/NodeData';
	import type { OutputData } from '$lib/data/OutputData';
	import { NodeItem, NodeList, setDefaultContexts, Vector } from 'nodes-editor';
	setDefaultContexts();
	// TODO find out why this have to be stateful and fix it
	const pointerStrategy = $state({});

	const devNode = new Node({
		id: 'devNode',
		inputs: [] as InputData[],
		outputs: [] as OutputData[],
		position: new Vector(100, 100).getData(),
	} as NodeData);
</script>

<div class="max-h-[50dvh] overflow-hidden bg-green-500 p-2">
	<div class="overflow-auto">
		<NodeList {pointerStrategy}>
			<div class="relative shrink-0 bg-blue-500" style:width="1000px" style:height="1000px">
				<NodeItem node={devNode} position={devNode.position}>
					<div class="bg-red-500">node</div>
				</NodeItem>
			</div>
		</NodeList>
	</div>
</div>
