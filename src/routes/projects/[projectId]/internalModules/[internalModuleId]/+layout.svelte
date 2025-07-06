<script lang="ts">
	import { page } from '$app/state';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { graphContextKey } from '$lib/graph/graphContext';
	import { internalModuleContextKey } from '$lib/module/internalModule/internalModuleContext';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	const { children }: Props = $props();
	const graphContext = getRequiredContext(graphContextKey);
	const internalModuleContext = getRequiredContext(internalModuleContextKey);

	$effect(() => {
		const { internalModuleId } = page.params;
		const { internalModules } = graphContext.graph;
		internalModuleContext.internalModule = internalModules.get(internalModuleId);
	});
</script>

{@render children?.()}
