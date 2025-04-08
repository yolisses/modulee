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
		getRectsBoundingRect,
		getRootElementContext,
		PointerEventDispatcher,
		PreviewConnectionPointerStrategy,
		SelectionBoxPointerStrategy,
		Vector,
		type EndPreviewConnectionEvent,
	} from 'nodes-editor';
	import AddNodeMenuWrapper from './add/AddNodeMenuWrapper.svelte';
	import { getInputAndOutput } from './getInputAndOutput';
	import { getScreenFontSize } from './getScreenFontSize';
	import { getScreenLineHeight } from './getScreenLineHeight';
	import NodeItem from './NodeItem.svelte';

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

	let minSize = $state(Vector.zero());

	$effect(() => {
		const nodeRects = Object.values(nodeRectsContext.nodeRects);

		let boundingRectSize;
		if (nodeRects.length === 0) {
			boundingRectSize = Vector.zero();
		} else {
			const boundingRect = getRectsBoundingRect(nodeRects);
			boundingRectSize = boundingRect.position.add(boundingRect.size);
		}

		const step = 100;
		const currentMinSize = boundingRectSize
			.divideByNumber(step)
			.ceil()
			.multiplyByNumber(step)
			.addByNumber(step);

		if (currentMinSize.x > minSize.x || currentMinSize.y > minSize.y) {
			minSize = minSize.max(currentMinSize);
		}
	});
</script>

<PointerEventDispatcher {pointerStrategy} oncontextmenu={handleContextMenu}>
	<div
		style:width={minSize.x + 'px'}
		style:height={minSize.y + 'px'}
		class="bg-dots relative select-none"
		bind:this={rootElementContext.rootElement}
		style:font-size={getScreenFontSize(spaceContext.space) + 'px'}
		style:line-height={getScreenLineHeight(spaceContext.space) + 'px'}
	>
		{#each nodes as node (node.id)}
			<NodeItem {node} />
		{/each}

		{#each connections as connection (connection.id)}
			<ConnectionItem {connection} />
		{/each}

		<PreviewConnectionWire />
		<AddNodeMenuWrapper {mouseEvent} />
		<SelectionBox />
	</div>
</PointerEventDispatcher>

<style lang="postcss">
	.bg-dots {
		background-size: 1lh 1lh;
		background-position: 0.5lh 0.5lh;
		background-image: radial-gradient(circle, #8884 0.05lh, rgba(0, 0, 0, 0) 0.05lh);
	}
</style>
