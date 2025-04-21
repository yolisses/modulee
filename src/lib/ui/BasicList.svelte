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
	};

	const { values, onClick, getId, getName, buttons, getHref }: Props = $props();
	const sortedValues = $derived(
		values.toSorted((a, b) => {
			return getName(a).localeCompare(getName(b));
		}),
	);
</script>

<div>
	{#each sortedValues as value (getId(value))}
		<BasicItem {value} {onClick} text={getName(value)} {buttons} href={getHref?.(value)} />
	{/each}
</div>
