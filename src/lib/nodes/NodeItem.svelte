<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import type { Node } from '$lib/types/Node';
	import { RemoveNodeCommand } from './commands/RemoveNodeCommand';

	let { node, space, editor }: { node: Node; space: Space; editor: Editor } = $props();

	const screenPosition = space.getScreenPosition(node.position);
	const screenSize = space.getScreenSize(node.size);

	function handleClick(e: MouseEvent) {
		const removeNodeCommand = new RemoveNodeCommand(node.id);
		editor.execute(removeNodeCommand);
	}
</script>

<button
	onclick={handleClick}
	style:width={screenSize.x + 'px'}
	style:height={screenSize.y + 'px'}
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	class="absolute w-fit bg-gray-500"
>
	{node.id}
</button>
