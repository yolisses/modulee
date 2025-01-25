<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		closeModal: () => void;
	}

	const { children, closeModal }: Props = $props();
</script>

<button class="fixed inset-0 bg-red-500" onclick={closeModal}></button>

<div class="pointer-events-none fixed inset-0 items-center justify-center">
	<div class="pointer-events-auto bg-green-500">
		{@render children?.()}
	</div>
</div>
