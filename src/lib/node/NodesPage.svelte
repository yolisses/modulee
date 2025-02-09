<script lang="ts">
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getGroupIdContext } from '$lib/group/groupIdContext';
	import { OffsetConverter } from '$lib/space/OffsetConverter';
	import { Space } from '$lib/space/Space.js';
	import { setSpaceContext } from '$lib/space/spaceContext';
	import { ZoomConverter } from '$lib/space/ZoomConverter';
	import { Vector } from 'nodes-editor';
	import type { Snippet } from 'svelte';
	import NodeList from './NodeList.svelte';
	import NodesToolbar from './NodesToolbar.svelte';

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
	<NodesToolbar bind:zoom {topBarChildren} />
	<div class="flex flex-1 flex-col overflow-auto">
		<NodeList nodes={visibleNodes} connections={editorContext.editor.connections} />
	</div>
</div>
