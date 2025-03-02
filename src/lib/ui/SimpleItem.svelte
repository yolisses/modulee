<script lang="ts" generics="T extends Item">
	import type { Item } from '$lib/array/Item';
	import type { Snippet } from 'svelte';

	interface Props {
		item: T;
		route: string;
		buttons?: Snippet<[{ id: string; item: T }]>;
	}

	const { item, route, buttons }: Props = $props();
</script>

<div class="hover-bg flex flex-row items-stretch">
	<a href={route.replace('[id]', item.id)} class="flex-1 p-2">
		{item.name}
	</a>
	{@render buttons?.({ id: item.id, item })}
</div>
