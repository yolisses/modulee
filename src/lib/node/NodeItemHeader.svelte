<script lang="ts">
	import { MoveNodesCommand } from '$lib/commands/MoveNodesCommand.js';
	import { RemoveNodeCommand } from '$lib/commands/RemoveNodeCommand.js';
	import { createId } from '$lib/data/createId.js';
	import { getEditorContext } from '$lib/editor/editorContext.js';
	import { getProjectIdContext } from '$lib/project/projectIdContext.js';
	import { getSpaceContext } from '$lib/space/spaceContext.js';
	import { getSelectedNodeIdsContext, Mover, Selector, Vector, type MoveEvent } from 'nodes-editor';
	import type { Node } from '../data/Node.svelte.js';
	import { nodesName } from './add/nodeNames.js';

	interface Props {
		node: Node;
	}

	const { node }: Props = $props();
	const spaceContext = getSpaceContext();
	const editorContext = getEditorContext();
	const projectIdContext = getProjectIdContext();
	const selectedNodeIdsContext = getSelectedNodeIdsContext();
	let initialNodePosition = $state(Vector.zero());

	// The criteria used to select this movement function is: Keep the cursor
	// always in the node area. Move the node only if the cursor passes the grid
	// lines.
	function getMoveDataPosition({ mouseRelativePosition, initialMouseRelativePosition }: MoveEvent) {
		const { space } = spaceContext;
		const mouseDataPosition = space.getDataPosition(mouseRelativePosition).floor();
		const initialMouseDataPosition = space.getDataPosition(initialMouseRelativePosition).floor();
		return initialNodePosition.add(mouseDataPosition).subtract(initialMouseDataPosition);
	}

	function handleStartMove(e: MoveEvent) {
		initialNodePosition = node.position.clone();
	}

	function handleMove(e: MoveEvent) {
		const dataPosition = getMoveDataPosition(e);
		node.position = dataPosition;
	}

	function handleEndMove(e: MoveEvent) {
		const dataPosition = getMoveDataPosition(e);
		const delta = dataPosition.subtract(initialNodePosition);
		if (dataPosition.equals(initialNodePosition)) return;
		const nodeIds = [...selectedNodeIdsContext.selectedNodeIds];
		const moveNodeCommand = new MoveNodesCommand({
			id: createId(),
			type: 'MoveNodesCommand',
			details: { delta, nodeIds },
			createdAt: new Date().toJSON(),
			projectId: projectIdContext.projectId,
		});
		editorContext.editor.execute(moveNodeCommand);
	}

	function handleContextMenu(e: MouseEvent) {
		const removeNodeCommand = new RemoveNodeCommand({
			id: createId(),
			type: 'RemoveNodeCommand',
			details: { nodeId: node.id },
			createdAt: new Date().toJSON(),
			projectId: projectIdContext.projectId,
		});
		editorContext.editor.execute(removeNodeCommand);
	}
</script>

<Selector id={node.id}>
	<Mover
		onMove={handleMove}
		onEndMove={handleEndMove}
		onStartMove={handleStartMove}
		oncontextmenu={handleContextMenu}
	>
		<div class="hover-bg" style:padding-inline="0.5lh">
			{nodesName[node.type]}
		</div>
	</Mover>
</Selector>
