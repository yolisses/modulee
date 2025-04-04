<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children?: Snippet;
		topChildren?: Snippet;
	}

	const { title, children, topChildren }: Props = $props();
</script>

<div class="flex flex-col items-center">
	<div class="flex w-full max-w-xl flex-col gap-4 p-4">
		<div class="flex h-10 flex-row items-center justify-between gap-2">
			<h1 class="pl-2 text-xl font-medium">{title}</h1>
			<div class="flex-1"></div>
			{@render topChildren?.()}
		</div>
		<div>
			{@render children?.()}
		</div>
	</div>
</div>
