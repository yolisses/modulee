<script lang="ts">
	import { RemoveNodeCommand } from '$lib/commands/node/RemoveNodeCommand.js';
	import InputItem from '$lib/connector/ui/InputItem.svelte';
	import { editorContextKey } from '$lib/editor/editorContext.js';
	import { createId } from '$lib/global/createId.js';
	import { getRequiredContext } from '$lib/global/getRequiredContext.js';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext.js';
	import { spaceContextKey } from '$lib/space/spaceContext.js';
	import {
		NodeItem as BaseNodeItem,
		EndConnectorAreaPointerStrategy,
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

	const { node, postInputsChildren, preInputsChildren, headerChildren }: Props = $props();

	const spaceContext = getRequiredContext(spaceContextKey);
	const selectedNodeIdsContext = getRequiredContext(selectedNodeIdsContextKey);
	const isSelected = $derived(selectedNodeIdsContext.selectedNodeIds.has(node.id));
	const screenPosition = $derived(spaceContext.space.getScreenPosition(node.position));
	const endConnectorAreaPointerStrategy = new EndConnectorAreaPointerStrategy(node.output);

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
	oncontextmenu={handleContextMenu}
	pointerStrategy={endConnectorAreaPointerStrategy}
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
