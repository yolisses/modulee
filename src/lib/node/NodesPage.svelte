<script lang="ts">
	import { getEditorContext } from '$lib/editor/editorContext';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import DevGroupList from '$lib/group/DevGroupList.svelte';
	import GroupNodesButton from '$lib/group/GroupNodesButton.svelte';
	import { OffsetConverter } from '$lib/space/OffsetConverter.js';
	import { Space } from '$lib/space/Space.js';
	import { ZoomConverter } from '$lib/space/ZoomConverter.js';
	import ZoomInButton from '$lib/zoom/ZoomInButton.svelte';
	import ZoomOutButton from '$lib/zoom/ZoomOutButton.svelte';
	import { Vector } from 'nodes-editor';
	import type { Snippet } from 'svelte';
	import NodeList from './NodeList.svelte';

	interface Props {
		projectId: string;
		topBarChildren?: Snippet;
	}

	const editorContext = getEditorContext();
	const { projectId, topBarChildren }: Props = $props();

	let zoom = $state(20);
	const space = $derived(
		new Space([new OffsetConverter(new Vector(3, 2)), new ZoomConverter(zoom)]),
	);
</script>

<div class="flex-row border-b border-b-black">
	{@render topBarChildren?.()}
	<UndoButton />
	<RedoButton />
	<ZoomInButton bind:zoom />
	<ZoomOutButton bind:zoom />
	<GroupNodesButton />
</div>

<div class="flex min-h-screen flex-row">
	<NodeList {space} {projectId} nodes={editorContext.editor.nodes} />
	<DevGroupList groups={editorContext.editor.groups} />
</div>
