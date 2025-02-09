<script lang="ts">
	import { DisconnectCommand } from '$lib/commands/Disconnect';
	import { SetConnection } from '$lib/commands/SetConnection';
	import ConnectionItem from '$lib/connection/ConnectionItem.svelte';
	import PreviewConnectionWire from '$lib/connection/PreviewConnectionWire.svelte';
	import type { Connection } from '$lib/data/Connection';
	import { createId } from '$lib/data/createId';
	import type { InputPath } from '$lib/data/InputPath';
	import type { Node } from '$lib/data/Node.svelte';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import SelectionBox from '$lib/selection/SelectionBox.svelte';
	import { getSpaceContext } from '$lib/space/spaceContext';
	import {
		getNodeListContext,
		getNodeRectsContext,
		getPreviewConnectionContext,
		getRectsBoundingRect,
		PointerEventDispatcher,
		PreviewConnectionPointerStrategy,
		SelectionBoxPointerStrategy,
		Vector,
		type EndPreviewConnectionEvent,
	} from 'nodes-editor';
	import AddNodeMenuWrapper from './add/AddNodeMenuWrapper.svelte';
	import ConstantNodeItem from './ConstantNodeItem.svelte';
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
	const spaceContext = getSpaceContext();
	const editorContext = getEditorContext();
	const nodeListContext = getNodeListContext();
	const nodeRectsContext = getNodeRectsContext();
	const projectDataContext = getProjectDataContext();

	function handleEndPreviewConnection(e: EndPreviewConnectionEvent) {
		const { input, output } = getInputAndOutput(e);
		if (!input) return;

		const inputPath: InputPath = {
			inputName: input.name,
			nodeId: input.node.id,
		};

		if (output) {
			const command = new SetConnection({
				id: createId(),
				type: 'SetConnection',
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
		previewConnectionContext.startConnector
			? previewConnectionPointerStrategy
			: selectionBoxPointerStrategy,
	);

	let minSize = $state(Vector.zero());

	$effect(() => {
		const nodeRects = Object.values(nodeRectsContext.nodeRects);
		if (nodeRects.length === 0) return;

		const step = 200;
		const boundingRect = getRectsBoundingRect(nodeRects);

		const currentMinSize = boundingRect.size
			.add(boundingRect.position)
			.divideByNumber(step)
			.ceil()
			.multiplyByNumber(step);

		if (minSize.x < currentMinSize.x || minSize.y < currentMinSize.y) {
			minSize = currentMinSize;
		}
	});
</script>

<PointerEventDispatcher
	oncontextmenu={handleContextMenu}
	{pointerStrategy}
	class="flex flex-1 flex-col"
>
	<div
		style:min-width={minSize.x + 'px'}
		style:min-height={minSize.y + 'px'}
		bind:this={nodeListContext.nodeList}
		class="bg-dots relative flex-1 select-none"
		style:font-size={getScreenFontSize(spaceContext.space) + 'px'}
		style:line-height={getScreenLineHeight(spaceContext.space) + 'px'}
	>
		{#each nodes as node (node.id)}
			{#if node.type === 'ConstantNode'}
				<ConstantNodeItem {node} />
			{:else}
				<NodeItem {node} />
			{/if}
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
		background-image: radial-gradient(circle, #8888 0.05lh, rgba(0, 0, 0, 0) 0.05lh);
	}
</style>
