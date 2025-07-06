<script lang="ts">
	import type { Vector } from 'nodes-editor';
	import type { Snippet } from 'svelte';
	import type { FloatingMenuManager } from './FloatingMenuManager.svelte';

	interface Props {
		floatingMenuManager: FloatingMenuManager;
		children: Snippet<[{ menuPosition: Vector }]>;
	}

	const { floatingMenuManager, children }: Props = $props();
	const menuPosition = $derived(floatingMenuManager.getMenuPosition());
</script>

{#if menuPosition}
	<div bind:this={floatingMenuManager.menu} class="absolute">
		{@render children({ menuPosition })}
	</div>
{/if}

<svelte:window onpointerdown={floatingMenuManager.handleWindowClick} />
