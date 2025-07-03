<script lang="ts">
	import { page } from '$app/state';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	const { children }: Props = $props();

	$effect(() => {
		const internalModuleIdContext = getRequiredContext(internalModuleIdContextKey);
		internalModuleIdContext.internalModuleId = page.params.internalModuleId;
	});
</script>

{@render children?.()}
