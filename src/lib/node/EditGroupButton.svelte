<script lang="ts">
	import { page } from '$app/state';
	import type { Group } from '$lib/data/Group.svelte';
	import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		group: Group;
	}

	const { group }: Props = $props();

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();
	}
</script>

<a
	title="Edit group"
	href="{page.url}/{group.id}"
	onpointerdown={handlePointerDown}
	class="hover-bg flex flex-row items-center"
>
	<Fa icon={faPenToSquare} fw />
</a>
