<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	interface Props {
		value: T;
		text: string;
		onClick: (value: T) => void;
		buttons?: Snippet<[value: T]>;
	}

	const { text, value, onClick, buttons }: Props = $props();

	function handleClick() {
		onClick(value);
	}
</script>

<div class="hover-bg flex flex-row rounded">
	<button onclick={handleClick} class="flex-1 p-2">
		{text}
	</button>
	{@render buttons?.(value)}
</div>
