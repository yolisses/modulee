<script lang="ts">
	import { Editor } from '$lib/editor/Editor.svelte';
	import { Vector } from '$lib/space/Vector';
	import NodeList from './NodeList.svelte';

	const editor = new Editor();
	editor.nodes = [
		{ id: '0', position: new Vector(0, 0), size: Vector.one() },
		{ id: '1', position: new Vector(1, 1), size: Vector.one() },
		{ id: '2', position: new Vector(2, 2), size: Vector.one() }
	];
</script>

<NodeList {editor} />
