<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import InputList from './input/InputList.svelte';
	import { Node } from './Node.svelte';
	import NodeItemHeader from './NodeItemHeader.svelte';
	import OutputList from './output/OutputList.svelte';

	interface Props {
		node: Node;
		space: Space;
		editor: Editor;
	}

	let { node, space, editor }: Props = $props();

	const screenSize = $derived(space.getScreenSize(node.size));
	const screenPosition = $derived(space.getScreenPosition(node.position));
</script>

<div
	style:outline-width="0.1lh"
	style:border-radius="0.4lh"
	style:width={screenSize.x + 'px'}
	style:height={screenSize.y + 'px'}
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	class="absolute w-fit break-words bg-zinc-600 outline outline-zinc-700"
>
	<NodeItemHeader {editor} {node} {space} />
	<OutputList {editor} {space} outputs={node.outputs} />
	<InputList {editor} {space} inputs={node.inputs} />
</div>
