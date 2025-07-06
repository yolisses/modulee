<script lang="ts">
	import type { FloatingMenuManager } from './FloatingMenuManager.svelte';

	interface Props {
		floatingMenuManager: FloatingMenuManager;
	}

	const { floatingMenuManager }: Props = $props();
	const menuPosition = $derived(floatingMenuManager.getMenuPosition());
</script>

{#if menuPosition}
	<div
		class="absolute"
		style:top={menuPosition.y + 'px'}
		style:left={menuPosition.x + 'px'}
		bind:this={floatingMenuManager.positioner}
	></div>
{/if}
