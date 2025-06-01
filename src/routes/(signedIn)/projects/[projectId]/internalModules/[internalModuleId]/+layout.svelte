<script lang="ts">
	import { page } from '$app/state';
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	const { children }: Props = $props();

	$effect(() => {
		const internalModuleIdContext = getInternalModuleIdContext();
		internalModuleIdContext.internalModuleId = page.params.internalModuleId;
	});
</script>

{@render children?.()}
