<script lang="ts">
	import { MoveNodesCommand } from '$lib/commands/node/MoveNodesCommand.js';
	import ConnectorJoint from '$lib/connector/ui/ConnectorJoint.svelte';
	import { editorContextKey } from '$lib/editor/editorContext.js';
	import { createId } from '$lib/global/createId.js';
	import { getRequiredContext } from '$lib/global/getRequiredContext.js';
	import { graphContextKey } from '$lib/graph/graphContext.js';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext.js';
	import { spaceContextKey } from '$lib/space/spaceContext.js';
	import {
		EmptyPointerStrategy,
		MoverPointerStrategy,
		PointerEventDispatcher,
		previewConnectionContextKey,
		selectedNodeIdsContextKey,
		SelectOnClickPointerStrategy,
		Vector,
		type MoveEvent,
	} from 'nodes-editor';
	import type { Snippet } from 'svelte';
	import type { Node } from '../Node.svelte.js';
	import { nodesName } from '../definitions/nodesName.js';

	interface Props {
		node: Node;
		children?: Snippet;
	}

	let element = $state<Element>();
	const spaceContext = getRequiredContext(spaceContextKey);
	const graphContext = getRequiredContext(graphContextKey);
	const editorContext = getRequiredContext(editorContextKey);
	const { node, children }: Props = $props();
	const projectDataContext = getRequiredContext(projectDataContextKey);
	let initialMouseDataPosition = $state(Vector.zero());
	const selectedNodeIdsContext = getRequiredContext(selectedNodeIdsContextKey);
	const previewConnectionContext = getRequiredContext(previewConnectionContextKey);
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
		graphContext.graph.nodes
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
		if (previewConnectionContext.startConnector) {
			return emptyPointerStrategy;
		}

		if (moverPointerStrategy) {
			return moverPointerStrategy;
		}

		return emptyPointerStrategy;
	});
</script>

<div class="hover-bg relative flex w-full cursor-move flex-row items-center">
	<PointerEventDispatcher
		class="flex flex-row items-center"
		{pointerStrategy}
		onpointerdown={(e) => {
			selectOnClickPointerStrategy.onpointerdown(e);
			moverPointerStrategy?.onpointerdown(e);
		}}
		style="width: calc(100% - 0.4lh);"
	>
		<div
			bind:this={element}
			style:padding-inline="0.2lh"
			title={nodesName[node.type]}
			class="overflow-and-ellipsis"
		>
			{nodesName[node.type]}
		</div>
	</PointerEventDispatcher>
	{@render children?.()}
	<div class="absolute" style:right="-0.2lh">
		<ConnectorJoint connector={node.output} />
	</div>
</div>
