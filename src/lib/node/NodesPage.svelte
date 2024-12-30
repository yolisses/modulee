<script lang="ts">
	import { Editor } from '$lib/editor/Editor.svelte';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import { OffsetConverter } from '$lib/space/OffsetConverter';
	import { RoundConverter } from '$lib/space/RoundConverter';
	import { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { ZoomConverter } from '$lib/space/ZoomConverter';
	import { devNodesData } from './dev/devNodesData';
	import { Node } from './Node.svelte';
	import NodeList from './NodeList.svelte';

	const editor = new Editor();

	editor.nodes = devNodesData.map((nodeData) => new Node(nodeData));

	const dataMinimumPosition = new Vector(-2, -1);
	const space = new Space([
		new RoundConverter(),
		new OffsetConverter(dataMinimumPosition.negate()),
		new ZoomConverter(20),
	]);
</script>

<div class="flex-row">
	<UndoButton {editor} />
	<RedoButton {editor} />
</div>
<NodeList {editor} {space} {dataMinimumPosition} />
