<script lang="ts" generics="T">
	import BasicLink from './BasicLink.svelte';

	interface Props {
		values: T[];
		getId: (value: T) => any;
		onClick: (value: T) => void;
		getName: (value: T) => string;
		getLink: (value: T) => string;
		onDelete?: (value: T) => void;
	}

	const { values, onClick, getId, getName, getLink, onDelete }: Props = $props();
	const sortedValues = $derived(
		values.toSorted((a, b) => {
			return getName(a).localeCompare(getName(b));
		}),
	);
</script>

{#each sortedValues as value (getId(value))}
	<BasicLink {onDelete} href={getLink(value)} {value} {onClick} text={getName(value)} />
{/each}
