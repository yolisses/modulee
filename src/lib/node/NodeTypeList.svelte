<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import type { NodeType } from './NodeType';
	import NodeTypeItem from './NodeTypeItem.svelte';

	interface Props {
		space: Space;
		editor: Editor;
		nodeTypes: NodeType[];
		closeModal: () => void;
	}

	const { space, editor, nodeTypes, closeModal }: Props = $props();
</script>

{#each nodeTypes as nodeType (nodeType.id)}
	<NodeTypeItem {space} {editor} {nodeType} {closeModal} />
{/each}
