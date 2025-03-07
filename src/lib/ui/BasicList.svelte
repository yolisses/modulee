<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';
	import BasicItem from './BasicItem.svelte';

	interface Props {
		values: T[];
		getId: (value: T) => any;
		onClick: (value: T) => void;
		getName: (value: T) => string;
		buttons?: Snippet<[value: T]>;
	}

	const { values, onClick, getId, getName, buttons }: Props = $props();
	const sortedValues = $derived(
		values.toSorted((a, b) => {
			return getName(a).localeCompare(getName(b));
		}),
	);
</script>

{#each sortedValues as value (getId(value))}
	<BasicItem {value} {onClick} text={getName(value)} {buttons} />
{/each}
