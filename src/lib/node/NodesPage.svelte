<script lang="ts">
	import { getEditorContext } from '$lib/editor/editorContext';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import BackButton from '$lib/group/BackButton.svelte';
	import { getGroupIdContext } from '$lib/group/groupIdContext';
	import GroupNodesButton from '$lib/group/GroupNodesButton.svelte';
	import { OffsetConverter } from '$lib/space/OffsetConverter';
	import { Space } from '$lib/space/Space.js';
	import { setSpaceContext } from '$lib/space/spaceContext';
	import { ZoomConverter } from '$lib/space/ZoomConverter';
	import ZoomInButton from '$lib/zoom/ZoomInButton.svelte';
	import ZoomOutButton from '$lib/zoom/ZoomOutButton.svelte';
	import { Vector } from 'nodes-editor';
	import type { Snippet } from 'svelte';
	import NodeList from './NodeList.svelte';

	interface Props {
		topBarChildren?: Snippet;
	}

	const editorContext = getEditorContext();
	const { topBarChildren }: Props = $props();
	const groupIdContext = getGroupIdContext();

	const spaceContext = $state({ space: new Space() });
	setSpaceContext(spaceContext);

	let zoom = $state(20);
	$effect(() => {
		spaceContext.space = new Space([
			new OffsetConverter(new Vector(3, 2)),
			new ZoomConverter(zoom),
		]);
	});

	const visibleNodes = $derived(
		editorContext.editor.nodes.filter((node) => {
			return node.groupId === groupIdContext.groupId;
		}),
	);
</script>

<div class="flex h-screen w-screen flex-col overflow-hidden">
	<div class="flex flex-row">
		{@render topBarChildren?.()}
		<UndoButton />
		<RedoButton />
		<ZoomInButton bind:zoom />
		<ZoomOutButton bind:zoom />
		<GroupNodesButton />
		<BackButton />
	</div>
	<div class="flex-1 overflow-auto">
		<NodeList nodes={visibleNodes} />
	</div>
</div>
