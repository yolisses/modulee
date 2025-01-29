<script lang="ts">
	import type { Group } from '$lib/data/Group.svelte';

	interface Props {
		groups: Group[];
	}

	const { groups }: Props = $props();
</script>

<div>
	here
	{#each groups as group (group.id)}
		<div>{group.id} {group.name}</div>
	{/each}
</div>
