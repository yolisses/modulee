<script lang="ts">
	import { devEditorData } from '$lib/editor/dev/devEditorData';
	import { Editor } from '$lib/editor/Editor.svelte';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import { NodeList } from 'nodes-editor';
	import { Node } from './data/Node.svelte';
	import { devNodesData } from './dev/devNodesData';
	import ZoomInButton from './zoom/ZoomInButton.svelte';
	import ZoomOutButton from './zoom/ZoomOutButton.svelte';

	let zoom = $state(20);

	const editor = new Editor(devEditorData);

	const nodes = devNodesData.map((nodeData) => new Node(nodeData));
</script>

<div class="flex-row border-b border-b-white/10">
	<UndoButton {editor} />
	<RedoButton {editor} />
	<ZoomInButton bind:zoom />
	<ZoomOutButton bind:zoom />
	<!-- <DevButton {editor} /> -->
</div>
<div class="flex-1 overflow-auto">
	<NodeList {zoom} {nodes} />
</div>
