<script lang="ts">
	import { getRootElementContext } from 'nodes-editor';
	import Portal from 'svelte-portal';
	import SetTargetGroupMenuWrapper from './SetTargetGroupMenuWrapper.svelte';

	interface Props {
		groupNodeId: string;
	}

	const { groupNodeId }: Props = $props();

	let mouseEvent = $state<MouseEvent>();

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();
	}

	function handleClick(e: MouseEvent) {
		mouseEvent = e;
	}

	const rootElementContext = getRootElementContext();
</script>

<button
	onclick={handleClick}
	style:padding-inline="0.25lh"
	onpointerdown={handlePointerDown}
	class="hover-bg overflow-and-ellipsis"
>
	<span class="opacity-50">Set group</span>
</button>

{#if rootElementContext.rootElement}
	<Portal target={rootElementContext.rootElement as HTMLElement}>
		<SetTargetGroupMenuWrapper {mouseEvent} {groupNodeId} />
	</Portal>
{/if}
