<script lang="ts">
	import type { ModalState } from '$lib/ui/ModalState.svelte';
	import type { InputMouseEvent } from '$lib/utils/InputMouseEvent';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		modalState: ModalState;
		preventCloseOnOverlayClick?: boolean;
	}

	let modal = $state<HTMLElement>();
	const { children, modalState, preventCloseOnOverlayClick }: Props = $props();

	function handleWindowClick(e: InputMouseEvent) {
		const clickedInside = modal?.contains(e.target as Node);
		if (!clickedInside) {
			modalState.close();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			modalState.close();
		}
	}

	function handleClickOnOverlay(e: MouseEvent) {
		if (preventCloseOnOverlayClick) {
			e.stopPropagation();
		}
	}
</script>

<div
	onclick={handleClickOnOverlay}
	class="fixed inset-0 z-10 flex items-center justify-center bg-black/50"
>
	<div class="contents" bind:this={modal}>
		{@render children?.()}
	</div>
</div>

<svelte:window onpointerdown={handleWindowClick} onkeydown={handleKeydown} />
