<script lang="ts">
	import { RemoveNodeCommand } from '$lib/commands/node/RemoveNodeCommand.js';
	import { ConnectorCondition } from '$lib/connector/ui/ConnectorCondition.js';
	import InputItem from '$lib/connector/ui/InputItem.svelte';
	import { editorContextKey } from '$lib/editor/editorContext.js';
	import { createId } from '$lib/global/createId.js';
	import { getRequiredContext } from '$lib/global/getRequiredContext.js';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext.js';
	import { spaceContextKey } from '$lib/space/spaceContext.js';
	import {
		NodeItem as BaseNodeItem,
		ConnectorAreaPointerStrategy,
		PointerEventDispatcher,
		selectedNodeIdsContextKey,
	} from 'nodes-editor';
	import type { Snippet } from 'svelte';
	import type { Node } from '../../Node.svelte.js';
	import { NODE_ITEM_WIDTH } from '../../NODE_ITEM_WIDTH.js';
	import NodeItemHeader from '../NodeItemHeader.svelte';

	interface Props {
		node: Node;
		headerChildren?: Snippet;
		preInputsChildren?: Snippet;
		postInputsChildren?: Snippet;
	}

	const spaceContext = getRequiredContext(spaceContextKey);
	const { node, postInputsChildren, preInputsChildren, headerChildren }: Props = $props();

	const selectedNodeIdsContext = getRequiredContext(selectedNodeIdsContextKey);
	const isSelected = $derived(selectedNodeIdsContext.selectedNodeIds.has(node.id));
	const screenPosition = $derived(spaceContext.space.getScreenPosition(node.position));

	const connectorId = node.output.id;
	const connectorCondition = new ConnectorCondition();
	const connectorAreaPointerStrategy = new ConnectorAreaPointerStrategy(
		connectorId,
		connectorCondition.endConnectorCondition,
	);

	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);
	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		const removeNodeCommand = new RemoveNodeCommand({
			id: createId(),
			type: 'RemoveNodeCommand',
			details: { nodeId: node.id },
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(removeNodeCommand);
		selectedNodeIdsContext.selectedNodeIds.delete(node.id);
	}
</script>

<PointerEventDispatcher
	pointerStrategy={connectorAreaPointerStrategy}
	oncontextmenu={handleContextMenu}
>
	<BaseNodeItem {node} position={screenPosition}>
		<div
			style:outline-width="0.1lh"
			style:border-radius="0.4lh"
			style:width="{NODE_ITEM_WIDTH}lh"
			class:outline-blue-500={isSelected}
			class:outline-zinc-800={!isSelected}
			class="node-item flex flex-col bg-zinc-700 outline"
		>
			<NodeItemHeader {node}>
				{@render headerChildren?.()}
			</NodeItemHeader>

			{@render preInputsChildren?.()}

			{#each node.inputs as input (input.id)}
				<InputItem {input} isLast={input === node.inputs.at(-1)} />
			{/each}

			{@render postInputsChildren?.()}
		</div>
	</BaseNodeItem>
</PointerEventDispatcher>
