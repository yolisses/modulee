<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte.js';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import NodeList from '$lib/node/NodeList.svelte';
	import { OffsetConverter } from '$lib/space/OffsetConverter.js';
	import { Space } from '$lib/space/Space.js';
	import { ZoomConverter } from '$lib/space/ZoomConverter.js';
	import ZoomInButton from '$lib/zoom/ZoomInButton.svelte';
	import ZoomOutButton from '$lib/zoom/ZoomOutButton.svelte';
	import { Vector } from 'nodes-editor';
	import type { Snippet } from 'svelte';

	interface Props {
		editor: Editor;
		projectId: string;
		topBarChildren?: Snippet;
	}

	const { editor, projectId, topBarChildren }: Props = $props();

	let zoom = $state(20);
	const space = $derived(
		new Space([new OffsetConverter(new Vector(3, 2)), new ZoomConverter(zoom)]),
	);
</script>

<div class="flex-row border-b border-b-black">
	{@render topBarChildren?.()}
	<UndoButton {editor} />
	<RedoButton {editor} />
	<ZoomInButton bind:zoom />
	<ZoomOutButton bind:zoom />
</div>
<div class="flex min-h-screen flex-col">
	<NodeList {editor} {space} {projectId} nodes={editor.nodes} />
</div>
