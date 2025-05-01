<script lang="ts">
	import { DisconnectCommand } from '$lib/commands/connection/DisconnectCommand';
	import { SetConnectionCommand } from '$lib/commands/connection/SetConnectionCommand';
	import ConnectionItem from '$lib/connection/ConnectionItem.svelte';
	import PreviewConnectionWire from '$lib/connection/PreviewConnectionWire.svelte';
	import type { Connection } from '$lib/data/Connection';
	import { createId } from '$lib/data/createId';
	import { getGraphContext } from '$lib/data/graphContext';
	import type { InputPath } from '$lib/data/InputPath';
	import type { Node } from '$lib/data/Node.svelte';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import SelectionBox from '$lib/selection/SelectionBox.svelte';
	import { getSpaceContext } from '$lib/space/spaceContext';
	import {
		getNodeRectsContext,
		getPreviewConnectionContext,
		getRootElementContext,
		PointerEventDispatcher,
		PreviewConnectionPointerStrategy,
		SelectionBoxPointerStrategy,
		type EndPreviewConnectionEvent,
	} from 'nodes-editor';
	import { onMount } from 'svelte';
	import AddNodeMenuWrapper from './add/AddNodeMenuWrapper.svelte';
	import { getInputAndOutput } from './getInputAndOutput';
	import { getScreenFontSize } from './getScreenFontSize';
	import { getScreenLineHeight } from './getScreenLineHeight';
	import NodeItem from './NodeItem.svelte';
	import { ResizeGraphCanvasHandler } from './ResizeGraphCanvasHandler.svelte';

	interface Props {
		nodes: Node[];
		connections: Connection[];
	}

	const { nodes, connections }: Props = $props();
	let mouseEvent = $state<MouseEvent>();

	const graphContext = getGraphContext();
	const spaceContext = getSpaceContext();
	const editorContext = getEditorContext();
	const nodeRectsContext = getNodeRectsContext();
	const rootElementContext = getRootElementContext();
	const projectDataContext = getProjectDataContext();

	function handleEndPreviewConnection(e: EndPreviewConnectionEvent) {
		const { input, output } = getInputAndOutput(e, graphContext.graph.connectors);
		if (!input) return;

		const inputPath: InputPath = {
			inputKey: input.key,
			nodeId: input.node.id,
		};

		if (output) {
			const command = new SetConnectionCommand({
				id: createId(),
				type: 'SetConnectionCommand',
				createdAt: new Date().toJSON(),
				projectId: projectDataContext.projectData.id,
				details: {
					connection: {
						inputPath,
						id: createId(),
						targetNodeId: output?.node.id,
					},
				},
			});
			editorContext.editor.execute(command);
		} else {
			const command = new DisconnectCommand({
				id: createId(),
				details: { inputPath },
				type: 'DisconnectCommand',
				createdAt: new Date().toJSON(),
				projectId: projectDataContext.projectData.id,
			});
			editorContext.editor.execute(command);
		}
	}

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		mouseEvent = e;
	}

	const previewConnectionPointerStrategy = new PreviewConnectionPointerStrategy(
		handleEndPreviewConnection,
	);
	const selectionBoxPointerStrategy = new SelectionBoxPointerStrategy();

	const previewConnectionContext = getPreviewConnectionContext();
	const pointerStrategy = $derived(
		previewConnectionContext.startConnectorId
			? previewConnectionPointerStrategy
			: selectionBoxPointerStrategy,
	);

	let container: HTMLElement;
	const graphCanvasResizeHandler = new ResizeGraphCanvasHandler();

	onMount(() => {
		// Returns destructor
		return graphCanvasResizeHandler.initialize(container);
	});
	$effect(() => {
		graphCanvasResizeHandler.handleRectsChange(nodeRectsContext.nodeRects);
	});
</script>

{#if nodes.length === 0}
	<div class="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
		<div class="rounde text-white/50">Use right click to create nodes</div>
	</div>
{/if}
<div class="flex-1 overflow-scroll" bind:this={container}>
	<PointerEventDispatcher {pointerStrategy} oncontextmenu={handleContextMenu}>
		<div
			class="bg-dots relative select-none"
			bind:this={rootElementContext.rootElement}
			style:width={graphCanvasResizeHandler.minSize.x + 'px'}
			style:height={graphCanvasResizeHandler.minSize.y + 'px'}
			style:font-size={getScreenFontSize(spaceContext.space) + 'px'}
			style:line-height={getScreenLineHeight(spaceContext.space) + 'px'}
		>
			{#each connections as connection (connection.id)}
				<ConnectionItem {connection} />
			{/each}

			{#each nodes as node (node.id)}
				<NodeItem {node} />
			{/each}

			<PreviewConnectionWire />
			<AddNodeMenuWrapper {mouseEvent} />
			<SelectionBox />
		</div>
	</PointerEventDispatcher>
</div>

<style lang="postcss">
	.bg-dots {
		background-size: 1lh 1lh;
		background-position: 0.5lh 0.5lh;
		background-image: radial-gradient(circle, #8884 0.05lh, rgba(0, 0, 0, 0) 0.05lh);
	}
</style>
