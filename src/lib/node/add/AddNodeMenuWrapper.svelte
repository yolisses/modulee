<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte.js';
	import type { Space } from '$lib/space/Space.js';
	import { computePosition, flip, shift } from '@floating-ui/dom';
	import { getMouseRelativePosition, getNodeListContext } from 'nodes-editor';
	import AddNodeMenu from './AddNodeMenu.svelte';

	interface Props {
		space: Space;
		editor: Editor;
		projectId: string;
		mouseEvent?: MouseEvent;
	}

	let { space, editor, projectId, mouseEvent = $bindable() }: Props = $props();

	let menu = $state<HTMLElement>();
	let positioner = $state<HTMLElement>();

	const nodeListContext = getNodeListContext();
	const menuPosition = $derived.by(() => {
		if (!mouseEvent) return;
		if (!nodeListContext.nodeList) return;
		return getMouseRelativePosition(mouseEvent, nodeListContext.nodeList);
	});

	function closeModal() {
		mouseEvent = undefined;
	}

	$effect(() => {
		if (!menu) return;
		if (!positioner) return;
		menuPosition;
		computePosition(positioner!, menu!, {
			placement: 'right',
			middleware: [flip(), shift()],
		}).then(({ x, y }) => {
			if (!menu) return;
			Object.assign(menu!.style, { top: `${y}px`, left: `${x}px` });
		});
	});
</script>

{#if menuPosition}
	<button onclick={closeModal} class="absolute h-full w-full" aria-label="overlay"></button>
	<div
		class="absolute"
		bind:this={positioner}
		style:top={menuPosition.y + 'px'}
		style:left={menuPosition.x + 'px'}
	></div>
	<div bind:this={menu} class="absolute">
		<AddNodeMenu {space} {editor} {projectId} {closeModal} screenPosition={menuPosition}
		></AddNodeMenu>
	</div>
{/if}
