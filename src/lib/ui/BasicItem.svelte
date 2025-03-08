<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import ButtonOrLink from './ButtonOrLink.svelte';

	type Props = {
		value: T;
		text: string;
		href?: string;
		onClick?: (value: T) => void;
		buttons?: Snippet<[value: T]>;
	};

	const { text, value, onClick, buttons, href }: Props = $props();

	function handleClick() {
		onClick?.(value);
	}
</script>

<div class="hover-bg flex flex-row rounded">
	<ButtonOrLink {href} onclick={handleClick} class="flex-1 p-2">
		{text}
	</ButtonOrLink>
	{@render buttons?.(value)}
</div>
