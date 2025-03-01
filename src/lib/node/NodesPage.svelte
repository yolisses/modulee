<script lang="ts">
	import { getGraphContext } from '$lib/data/graphContext';
	import { getGroupIdContext } from '$lib/group/groupIdContext';
	import { ShortcutHandler } from '$lib/shortcut/ShortcutHandler.svelte';
	import { OffsetConverter } from '$lib/space/OffsetConverter';
	import { Space } from '$lib/space/Space.js';
	import { setSpaceContext } from '$lib/space/spaceContext';
	import { ZoomConverter } from '$lib/space/ZoomConverter';
	import { setZoomContext } from '$lib/ui/zoomContext';
	import { Vector } from 'nodes-editor';
	import { onMount } from 'svelte';
	import NodeList from './NodeList.svelte';
	import NodesToolbar from './NodesToolbar.svelte';

	const graphContext = getGraphContext();
	const groupIdContext = getGroupIdContext();

	const spaceContext = $state({ space: new Space() });
	setSpaceContext(spaceContext);

	const zoomContext = $state({ zoom: 20 });
	setZoomContext(zoomContext);

	$effect(() => {
		spaceContext.space = new Space([
			new OffsetConverter(new Vector(3, 2)),
			new ZoomConverter(zoomContext.zoom),
		]);
	});

	const visibleNodes = $derived(
		graphContext.graph.nodes.values().filter((node) => {
			return node.groupId === groupIdContext.groupId;
		}),
	);

	const shortcutHandler = new ShortcutHandler();

	onMount(() => {
		shortcutHandler.initialize();
		return () => shortcutHandler.destroy();
	});
</script>

<div class="flex h-screen w-screen flex-col overflow-hidden">
	<NodesToolbar />
	<div class="flex flex-1 flex-col overflow-auto">
		<NodeList nodes={visibleNodes} connections={graphContext.graph.connections.values()} />
	</div>
</div>
