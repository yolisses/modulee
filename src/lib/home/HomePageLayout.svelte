<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children?: Snippet;
		topChildren?: Snippet;
	}

	const { title, children, topChildren }: Props = $props();
</script>

<div class="flex-1 overflow-hidden">
	<div class="flex h-[100dvh] flex-col items-center overflow-auto">
		<div class="flex w-full max-w-xl flex-col gap-4 p-4">
			<div class="flex h-10 flex-row items-center justify-between gap-2">
				<h1 class="p-2 text-xl font-medium">{title}</h1>
				<div class="flex-1"></div>
				{@render topChildren?.()}
			</div>
			{@render children?.()}
		</div>
	</div>
</div>
