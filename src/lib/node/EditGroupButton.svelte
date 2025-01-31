<script lang="ts">
	import type { Group } from '$lib/data/Group.svelte';
	import { getGroupIdContext } from '$lib/group/groupIdContext';
	import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		group: Group;
	}

	const { group }: Props = $props();
	const groupIdContext = getGroupIdContext();

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();
		groupIdContext.groupId = group.id;
	}
</script>

<button
	title="Edit group"
	onpointerdown={handlePointerDown}
	class="hover-bg flex flex-row items-center"
>
	<Fa icon={faPenToSquare} fw />
</button>
