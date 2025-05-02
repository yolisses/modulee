<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import BasicItem from './BasicItem.svelte';

	type Props = {
		items: T[];
		getId: (item: T) => any;
		onClick?: (item: T) => void;
		getName: (item: T) => string;
		getHref?: (item: T) => string;
		buttons?: Snippet<[{ item: T }]>;
		compare?: (a: T, b: T) => number;
		content?: Snippet<[{ item: T; text: string }]>;
	};

	function compareByName(a: T, b: T) {
		return getName(a).localeCompare(getName(b));
	}

	const {
		getId,
		items,
		onClick,
		getName,
		buttons,
		getHref,
		content,
		compare = compareByName,
	}: Props = $props();

	const sortedItems = $derived(
		items.toSorted((a, b) => {
			return (compare ?? compareByName)(a, b);
		}),
	);
</script>

<div>
	{#each sortedItems as item (getId(item))}
		<BasicItem {item} {onClick} {buttons} {content} text={getName(item)} href={getHref?.(item)} />
	{/each}
</div>
