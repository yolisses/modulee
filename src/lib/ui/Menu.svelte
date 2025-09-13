<script lang="ts">
	import type { InputMouseEvent } from '$lib/utils/InputMouseEvent';
	import { computePosition, flip, shift, type Placement } from '@floating-ui/dom';
	import { type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		placement?: Placement;
		closeModal: () => void;
		referenceElement: HTMLElement;
	}

	let menu = $state<HTMLElement>();
	const { children, closeModal, placement = 'bottom', referenceElement }: Props = $props();

	function handleWindowClick(e: InputMouseEvent) {
		const clickedInside = menu?.contains(e.target as Node);
		if (!clickedInside) {
			closeModal();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeModal();
		}
	}

	$effect(() => {
		if (!menu) return;

		computePosition(referenceElement, menu, {
			placement,
			middleware: [flip(), shift()],
		}).then((position) => {
			if (!menu) return;
			const { x, y } = position;
			Object.assign(menu.style, { left: `${x}px`, top: `${y}px` });
		});
	});
</script>

<button onclick={closeModal} class="fixed inset-0 z-10" aria-label="overlay"></button>

<div
	class="absolute top-0 left-0 z-10 flex w-max flex-col rounded border border-black/50 bg-zinc-800 shadow-lg"
	bind:this={menu}
>
	{@render children?.()}
</div>

<svelte:window onpointerdown={handleWindowClick} onkeydown={handleKeydown} />
