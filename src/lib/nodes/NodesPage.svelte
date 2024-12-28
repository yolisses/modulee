<script lang="ts">
	import { Editor } from '$lib/editor/Editor.svelte';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import { Vector } from '$lib/space/Vector';
	import { defaultNodeSize } from './defaultNodeSize';
	import NodeList from './NodeList.svelte';

	const editor = new Editor();

	editor.nodes = [
		{ id: '0', position: new Vector(0, 0), size: defaultNodeSize },
		{ id: '1', position: new Vector(1, 1), size: defaultNodeSize },
		{ id: '2', position: new Vector(2, 2), size: defaultNodeSize },
	];
</script>

<div class="flex-row">
	<UndoButton {editor} />
	<RedoButton {editor} />
</div>
<NodeList {editor} />
