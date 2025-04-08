<script lang="ts">
	import { getGraphContext } from '$lib/data/graphContext';
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import { Contexts } from '$lib/shortcut/Contexts.svelte';
	import { setContextsContext } from '$lib/shortcut/contextsContext';
	import { ShortcutHandler } from '$lib/shortcut/ShortcutHandler.svelte';
	import { setShortcutHandlerContext } from '$lib/shortcut/shortcutHandlerContext';
	import { OffsetConverter } from '$lib/space/OffsetConverter';
	import { Space } from '$lib/space/Space.js';
	import { setSpaceContext } from '$lib/space/spaceContext';
	import { setZoomContext } from '$lib/space/zoom/zoomContext';
	import { ZoomConverter } from '$lib/space/ZoomConverter';
	import { Vector } from 'nodes-editor';
	import { onMount } from 'svelte';
	import NodeList from './NodeList.svelte';
	import NodesToolbar from './NodesToolbar.svelte';

	const graphContext = getGraphContext();
	const internalModuleIdContext = getInternalModuleIdContext();

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
			return node.internalModuleId === internalModuleIdContext.internalModuleId;
		}),
	);

	const contexts = new Contexts();
	setContextsContext({ contexts });

	const shortcutHandler = new ShortcutHandler();
	setShortcutHandlerContext({ shortcutHandler });

	onMount(() => {
		shortcutHandler.initialize();
		return () => shortcutHandler.destroy();
	});

	let container: HTMLElement;
	let containerSize = $state(Vector.zero());
	$effect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			const entry = entries[0];
			containerSize = new Vector(entry.contentRect.width, entry.contentRect.height);
		});
		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
		};
	});
</script>

<div class="flex flex-1 flex-col overflow-hidden">
	<NodesToolbar />
	<div class="flex-1 overflow-scroll" bind:this={container}>
		<NodeList
			{containerSize}
			nodes={visibleNodes}
			connections={graphContext.graph.connections.values()}
		/>
	</div>
</div>
