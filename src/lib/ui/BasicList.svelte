<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import BasicItem from './BasicItem.svelte';

	type Props = {
		values: T[];
		getId: (value: T) => any;
		onClick?: (value: T) => void;
		getName: (value: T) => string;
		buttons?: Snippet<[value: T]>;
		getHref?: (value: T) => string;
		content?: Snippet<[{ value: T; text: string }]>;
		compare?: (a: T, b: T) => number;
	};

	function compareByName(a: T, b: T) {
		return getName(a).localeCompare(getName(b));
	}

	const {
		getId,
		values,
		onClick,
		getName,
		buttons,
		getHref,
		content,
		compare = compareByName,
	}: Props = $props();

	const sortedValues = $derived(
		values.toSorted((a, b) => {
			return (compare ?? compareByName)(a, b);
		}),
	);
</script>

<div>
	{#each sortedValues as value (getId(value))}
		<BasicItem
			{value}
			{onClick}
			{buttons}
			{content}
			text={getName(value)}
			href={getHref?.(value)}
		/>
	{/each}
</div>
