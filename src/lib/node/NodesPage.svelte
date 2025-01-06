<script lang="ts">
	import { devEditorData } from '$lib/editor/dev/devEditorData';
	import { Editor } from '$lib/editor/Editor.svelte';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import { OffsetConverter } from '$lib/space/OffsetConverter';
	import { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { ZoomConverter } from '$lib/space/ZoomConverter';
	import { onMount } from 'svelte';
	import { Graph, init_console, set_panic_hook } from '../../engine/pkg/modulee_engine';
	import NodeList from './NodeList.svelte';
	import ZoomInButton from './zoom/ZoomInButton.svelte';
	import ZoomOutButton from './zoom/ZoomOutButton.svelte';

	let zoom = $state(20);

	const editor = new Editor(devEditorData);

	const space = $derived(
		new Space([new OffsetConverter(new Vector(3, 2)), new ZoomConverter(zoom)]),
	);

	let graph = $state<Graph>();

	$effect(() => {
		if (graph) {
			graph.set_nodes([
				{
					type: 'AddNode',
					input1: 1,
					input2: 2,
					output: 3,
				},
			]);
			graph.debug();
		}
	});

	onMount(() => {
		init_console();
		graph = new Graph();
		set_panic_hook();
	});
</script>

<div class="flex-row">
	<UndoButton {editor} />
	<RedoButton {editor} />
	<ZoomInButton bind:zoom />
	<ZoomOutButton bind:zoom />
</div>
<div class="flex-row">
	<!-- <CommandList commands={editor.history} />
	<CommandList commands={editor.undoneHistory} /> -->
	<NodeList {editor} {space} />
</div>
