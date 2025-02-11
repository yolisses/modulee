<script lang="ts">
	import { MoveNodesCommand } from '$lib/commands/MoveNodesCommand.js';
	import ConnectorJoint from '$lib/connector/ConnectorJoint.svelte';
	import { createId } from '$lib/data/createId.js';
	import { getEditorContext } from '$lib/editor/editorContext.js';
	import { getProjectDataContext } from '$lib/project/projectDataContext.js';
	import { getSpaceContext } from '$lib/space/spaceContext.js';
	import {
		EmptyPointerStrategy,
		getPreviewConnectionContext,
		getSelectedNodeIdsContext,
		MoverPointerStrategy,
		PointerEventDispatcher,
		SelectOnClickPointerStrategy,
		Vector,
		type MoveEvent,
	} from 'nodes-editor';
	import type { Snippet } from 'svelte';
	import type { Node } from '../data/Node.svelte.js';
	import { nodesName } from './add/nodeNames.js';

	interface Props {
		node: Node;
		children?: Snippet;
	}

	let element = $state<Element>();
	const spaceContext = getSpaceContext();
	const editorContext = getEditorContext();
	const { node, children }: Props = $props();
	const projectDataContext = getProjectDataContext();
	let initialMouseDataPosition = $state(Vector.zero());
	const selectedNodeIdsContext = getSelectedNodeIdsContext();
	const previewConnectionContext = getPreviewConnectionContext();
	let initialNodePositions = $state<Map<Node, Vector>>(new Map());

	// The criteria to this movement function is: Keep the cursor always in the
	// node area. Move the node only if the cursor passes the grid lines.
	function getMoveDataDelta({ mouseRelativePosition }: MoveEvent) {
		const mouseDataPosition = spaceContext.space.getDataPosition(mouseRelativePosition).floor();
		return mouseDataPosition.subtract(initialMouseDataPosition);
	}

	function handleStartMove({ initialMouseRelativePosition }: MoveEvent) {
		initialMouseDataPosition = spaceContext.space
			.getDataPosition(initialMouseRelativePosition)
			.floor();

		initialNodePositions = new Map();
		editorContext.editor.nodes
			.values()
			.filter((node) => selectedNodeIdsContext.selectedNodeIds.has(node.id))
			.forEach((node) => {
				initialNodePositions.set(node, node.position);
			});
	}

	function handleMove(e: MoveEvent) {
		const delta = getMoveDataDelta(e);
		for (let [node, initialPosition] of initialNodePositions) {
			node.position = initialPosition.add(delta);
		}
	}

	function handleEndMove(e: MoveEvent) {
		const delta = getMoveDataDelta(e);
		if (delta.equals(Vector.zero())) return;
		const nodeIds = [...selectedNodeIdsContext.selectedNodeIds];
		const moveNodeCommand = new MoveNodesCommand({
			id: createId(),
			type: 'MoveNodesCommand',
			details: { delta, nodeIds },
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(moveNodeCommand);
	}

	const emptyPointerStrategy = new EmptyPointerStrategy();
	const selectOnClickPointerStrategy = new SelectOnClickPointerStrategy(node.id);
	const moverPointerStrategy = $derived(
		element
			? new MoverPointerStrategy(element, {
					onMove: handleMove,
					onEndMove: handleEndMove,
					onStartMove: handleStartMove,
				})
			: undefined,
	);

	const pointerStrategy = $derived.by(() => {
		// If connecting
		if (previewConnectionContext.startConnectorId) {
			return emptyPointerStrategy;
		}

		if (moverPointerStrategy) {
			return moverPointerStrategy;
		}

		return emptyPointerStrategy;
	});
</script>

<div class="hover-bg flex flex-1 flex-row items-center">
	<PointerEventDispatcher
		class="flex-1"
		{pointerStrategy}
		onpointerdown={(e) => {
			selectOnClickPointerStrategy.onpointerdown(e);
			moverPointerStrategy?.onpointerdown(e);
		}}
	>
		<div
			bind:this={element}
			style:padding-inline="0.2lh"
			title={nodesName[node.type]}
			class="block flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
		>
			{nodesName[node.type]}
		</div>
	</PointerEventDispatcher>
	{@render children?.()}
	<ConnectorJoint connector={node.output} />
</div>
