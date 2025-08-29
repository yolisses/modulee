<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<div class="pretty">
	{@render children()}
</div>

<style lang="postcss">
	@reference "tailwindcss";

	.pretty :global(a) {
		@apply text-blue-200;
	}

	.pretty :global(h2) {
		@apply mt-5 text-xl;
	}
	.pretty :global(h3) {
		@apply mt-4 text-lg;
	}

	.pretty :global(ul) {
		@apply list-disc;
	}
	.pretty :global(ol) {
		@apply list-decimal;
	}

	.pretty :global(table),
	.pretty :global(th),
	.pretty :global(td) {
		@apply border-collapse border border-white/50;
	}

	.pretty :global(td),
	.pretty :global(th) {
		@apply p-2;
	}

	.pretty :global(table) {
		@apply my-4;
	}
</style>
