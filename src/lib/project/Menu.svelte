<script lang="ts">
	import type { InputMouseEvent } from '$lib/utils/InputMouseEvent';
	import { computePosition, flip, shift } from '@floating-ui/dom';
	import { type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		closeModal: () => void;
		referenceElement: HTMLElement;
	}

	let menu = $state<HTMLElement>();
	const { children, closeModal, referenceElement }: Props = $props();

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
			middleware: [flip(), shift()],
			placement: 'right',
		}).then((position) => {
			if (!menu) return;
			const { x, y } = position;
			Object.assign(menu.style, { left: `${x}px`, top: `${y}px` });
		});
	});
</script>

<div
	class="absolute left-0 top-0 flex w-max flex-col rounded border border-black/50 bg-zinc-800 shadow-lg"
	bind:this={menu}
>
	{@render children?.()}
</div>

<svelte:window onpointerdown={handleWindowClick} onkeydown={handleKeydown} />
