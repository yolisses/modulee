<script lang="ts">
	import { getShortString } from '$dev/getShortString';
	import type { Group } from '$lib/data/Group.svelte';

	interface Props {
		groups: Group[];
	}

	const { groups }: Props = $props();
</script>

<div>
	{#each groups as group (group.id)}
		<div>{getShortString(group.id)} {group.name}</div>
	{/each}
</div>
