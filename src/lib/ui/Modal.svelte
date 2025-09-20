<script lang="ts">
	import type { ModalState } from '$lib/project/ui/ModalState.svelte';
	import type { InputMouseEvent } from '$lib/utils/InputMouseEvent';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		modalState: ModalState;
	}

	let modal = $state<HTMLElement>();
	const { children, modalState }: Props = $props();

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
</script>

<div class="pointer-events-none fixed inset-0 flex items-center justify-center bg-black/50">
	<div class="pointer-events-auto contents" bind:this={modal}>
		{@render children?.()}
	</div>
</div>

<svelte:window onpointerdown={handleWindowClick} onkeydown={handleKeydown} />
