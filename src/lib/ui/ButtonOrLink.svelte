<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes & HTMLAnchorAttributes;

	const props: Props = $props();
</script>

{#if props.href}
	<a {...props}>{@render props.children?.()}</a>
{:else}
	<button {...props}>{@render props.children?.()}</button>
{/if}
