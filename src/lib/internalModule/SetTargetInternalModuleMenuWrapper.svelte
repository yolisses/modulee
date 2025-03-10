<script lang="ts">
	import { computePosition, flip, shift } from '@floating-ui/dom';
	import { getMouseRelativePosition, getRootElementContext } from 'nodes-editor';
	import SetTargetInternalModuleMenu from './SetTargetInternalModuleMenu.svelte';

	interface Props {
		moduleNodeId: string;
		mouseEvent?: MouseEvent;
	}

	let { moduleNodeId, mouseEvent = $bindable() }: Props = $props();

	let menu = $state<HTMLElement>();
	let positioner = $state<HTMLElement>();

	const rootElementContext = getRootElementContext();
	const menuPosition = $derived.by(() => {
		if (!mouseEvent) return;
		if (!rootElementContext.rootElement) return;
		return getMouseRelativePosition(mouseEvent, rootElementContext.rootElement);
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
		<SetTargetInternalModuleMenu {closeModal} {moduleNodeId} />
	</div>
{/if}
