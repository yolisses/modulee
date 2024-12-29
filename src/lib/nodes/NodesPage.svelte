<script lang="ts">
	import { Editor } from '$lib/editor/Editor.svelte';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import { Vector } from '$lib/space/Vector';
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
			connectors: [{ id: '1/1' }],
		},
		{
			id: '2',
			size: defaultNodeSize,
			position: defaultNodeSize.multiply(Vector.fromNumber(2)),
			connectors: [{ id: '2/1' }, { id: '2/2' }],
		},
	];
</script>

<div class="flex-row">
	<UndoButton {editor} />
	<RedoButton {editor} />
</div>
<NodeList {editor} />
