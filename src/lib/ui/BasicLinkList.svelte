<script lang="ts" generics="T">
	import BasicLink from './BasicLink.svelte';

	interface Props {
		values: T[];
		getId: (value: T) => any;
		onClick: (value: T) => void;
		getName: (value: T) => string;
		getLink: (value: T) => string;
	}

	const { values, onClick, getId, getName, getLink }: Props = $props();
	const sortedValues = values.toSorted((a, b) => {
		return getName(a).localeCompare(getName(b));
	});
</script>

{#each sortedValues as value (getId(value))}
	<BasicLink href={getLink(value)} {value} {onClick} text={getName(value)} />
{/each}
