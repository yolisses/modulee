<script lang="ts">
	import type { InputMouseEvent } from '$lib/utils/InputMouseEvent';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		closeModal: () => void;
	}

	let modal = $state<HTMLElement>();
	const { children, closeModal }: Props = $props();

	function handleWindowClick(e: InputMouseEvent) {
		const clickedInside = modal?.contains(e.target as Node);
		if (!clickedInside) {
			closeModal();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeModal();
		}
	}
</script>

<!-- TODO consider replacing closeModal by making isOpen bindable -->
<div class="pointer-events-none fixed inset-0 flex items-center justify-center bg-black/50">
	<div class="pointer-events-auto contents" bind:this={modal}>
		{@render children?.()}
	</div>
</div>

<svelte:window onpointerdown={handleWindowClick} onkeydown={handleKeydown} />
