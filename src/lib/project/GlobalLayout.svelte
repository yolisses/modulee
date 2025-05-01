<script lang="ts">
	import { page } from '$app/state';
	import { setCopyDataContext } from '$lib/graph/copy/copyDataContext';
	import { setModalRootContext, type ModalRootContext } from '$lib/ui/modalRootContext';
	import { type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	$effect(() => {
		const url = new URL(page.url);
		const path = url.pathname;
		window.__JUCE__?.backend.emitEvent('setPath', { path });
	});

	// TODO check if it makes sense to not have a state here
	setCopyDataContext({ offset: 0 });

	const modalRootContext = $state({} as ModalRootContext);
	setModalRootContext(modalRootContext);
</script>

<div class="contents" bind:this={modalRootContext.modalRoot}>
	{@render children()}
</div>
