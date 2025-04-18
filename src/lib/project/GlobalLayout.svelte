<script lang="ts">
	import { page } from '$app/state';
	import { setCopyDataContext, type CopyDataContext } from '$lib/copy/copyDataContext';
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

	const copyDataContext = $state<CopyDataContext>({});
	setCopyDataContext(copyDataContext);
</script>

{@render children()}
