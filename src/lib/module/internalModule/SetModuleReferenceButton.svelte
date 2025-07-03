<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import type { Snippet } from 'svelte';
	import Portal from 'svelte-portal';
	import SetModuleReferenceMenuWrapper from './SetModuleReferenceMenuWrapper.svelte';
	import { rootElementContextKey } from 'nodes-editor';

	interface Props {
		moduleNodeId: string;
		children: Snippet;
	}

	const { children, moduleNodeId }: Props = $props();

	let mouseEvent = $state<MouseEvent>();

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();
	}

	function handleClick(e: MouseEvent) {
		mouseEvent = e;
	}

	const rootElementContext = getRequiredContext(rootElementContextKey);
</script>

<button onclick={handleClick} onpointerdown={handlePointerDown} class="hover-bg">
	{@render children()}
</button>

{#if rootElementContext.rootElement}
	<Portal target={rootElementContext.rootElement as HTMLElement}>
		<SetModuleReferenceMenuWrapper {mouseEvent} {moduleNodeId} />
	</Portal>
{/if}
