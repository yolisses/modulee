<script lang="ts">
	import { Editor } from '$lib/editor/Editor.svelte';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import { OffsetConverter } from '$lib/space/OffsetConverter';
	import { RoundConverter } from '$lib/space/RoundConverter';
	import { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { ZoomConverter } from '$lib/space/ZoomConverter';
	import { defaultNodeSize } from './defaultNodeSize';
	import NodeList from './NodeList.svelte';

	const editor = new Editor();

	editor.nodes = [
		{
			id: '0',
			size: defaultNodeSize,
			position: defaultNodeSize.multiply(Vector.fromNumber(0)),
			connectors: [],
		},
		{
			id: '1',
			size: defaultNodeSize,
			position: defaultNodeSize.multiply(Vector.fromNumber(1)),
			connectors: [{ id: '1/1', name: 'some input' }],
		},
		{
			id: '2|lpqA',
			size: defaultNodeSize,
			position: defaultNodeSize.multiply(Vector.fromNumber(2)),
			connectors: [
				{ id: '2/1', name: 'some output' },
				{ id: '2/2', name: 'some input' },
			],
		},
	];

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
