<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import ButtonOrLink from './ButtonOrLink.svelte';

	type Props = {
		value: T;
		text: string;
		href?: string;
		onClick?: (value: T) => void;
		buttons?: Snippet<[value: T]>;
		content?: Snippet<[{ value: T; text: string }]>;
	};

	const { text, value, onClick, buttons, href, content }: Props = $props();

	function handleClick() {
		onClick?.(value);
	}
</script>

<div class="hover-bg flex flex-row items-center rounded">
	<ButtonOrLink {href} onclick={handleClick} class="flex-1 p-2">
		{#if content}
			{@render content({ value, text })}
		{:else}
			{text}
		{/if}
	</ButtonOrLink>
	{@render buttons?.(value)}
</div>
