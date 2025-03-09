<script lang="ts">
	import { getRootElementContext } from 'nodes-editor';
	import type { Snippet } from 'svelte';
	import Portal from 'svelte-portal';
	import SetTargetGroupMenuWrapper from './SetTargetGroupMenuWrapper.svelte';

	interface Props {
		groupNodeId: string;
		children: Snippet;
	}

	const { children, groupNodeId }: Props = $props();

	let mouseEvent = $state<MouseEvent>();

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();
	}

	function handleClick(e: MouseEvent) {
		mouseEvent = e;
	}

	const rootElementContext = getRootElementContext();
</script>

<button onclick={handleClick} onpointerdown={handlePointerDown} class="hover-bg">
	{@render children()}
</button>

{#if rootElementContext.rootElement}
	<Portal target={rootElementContext.rootElement as HTMLElement}>
		<SetTargetGroupMenuWrapper {mouseEvent} {groupNodeId} />
	</Portal>
{/if}
