<script lang="ts">
	import { setModalRootContext, type ModalRootContext } from '$lib/ui/modalRootContext';
	import { type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	const modalRootContext = $state({} as ModalRootContext);
	setModalRootContext(modalRootContext);
</script>

<div class="contents" bind:this={modalRootContext.modalRoot}>
	{@render children()}
</div>
