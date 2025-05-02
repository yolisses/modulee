<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import ButtonOrLink from './ButtonOrLink.svelte';

	type Props = {
		item: T;
		text: string;
		href?: string;
		onClick?: (item: T) => void;
		buttons?: Snippet<[{ item: T }]>;
		content?: Snippet<[{ item: T; text: string }]>;
	};

	const { text, item, onClick, buttons, href, content }: Props = $props();

	function handleClick() {
		onClick?.(item);
	}
</script>

<div class="hover-bg flex flex-row items-center rounded">
	<ButtonOrLink {href} onclick={handleClick} class="flex-1 p-2">
		{#if content}
			{@render content({ item, text })}
		{:else}
			{text}
		{/if}
	</ButtonOrLink>
	{@render buttons?.({ item })}
</div>
