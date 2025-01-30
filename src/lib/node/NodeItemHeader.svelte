<script lang="ts">
	import { MoveNodeCommand } from '$lib/commands/MoveNodeCommand.js';
	import { RemoveNodeCommand } from '$lib/commands/RemoveNodeCommand.js';
	import { createId } from '$lib/data/createId.js';
	import { getEditorContext } from '$lib/editor/editorContext.js';
	import { getProjectIdContext } from '$lib/project/projectIdContext.js';
	import { getSpaceContext } from '$lib/space/spaceContext.js';
	import { Mover, Selector, Vector, type MoveEvent } from 'nodes-editor';
	import type { Node } from '../data/Node.svelte.js';
	import { nodesName } from './add/nodeNames.js';

	interface Props {
		node: Node;
	}

	const { node }: Props = $props();
	const spaceContext = getSpaceContext();
	const editorContext = getEditorContext();
	const projectIdContext = getProjectIdContext();
	let initialNodePosition = $state(Vector.zero());

	function getMoveDataPosition({ mouseRelativePosition, initialMouseRelativePosition }: MoveEvent) {
		const screenInitialNodePosition = spaceContext.space.getScreenPosition(initialNodePosition);
		const screenNodePosition = mouseRelativePosition
			.add(screenInitialNodePosition)
			.subtract(initialMouseRelativePosition);
		return spaceContext.space.getDataPosition(screenNodePosition).floor();
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
		if (dataPosition.equals(initialNodePosition)) return;
		const moveNodeCommand = new MoveNodeCommand({
			id: createId(),
			type: 'MoveNodeCommand',
			createdAt: new Date().toJSON(),
			projectId: projectIdContext.projectId,
			details: { nodeId: node.id, position: dataPosition },
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
