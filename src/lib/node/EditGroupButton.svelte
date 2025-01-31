<script lang="ts">
	import type { Group } from '$lib/data/Group.svelte';
	import { getProjectIdContext } from '$lib/project/projectIdContext';
	import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		group: Group;
	}

	const { group }: Props = $props();

	const projectIdContext = getProjectIdContext();
</script>

<a
	title="Edit group"
	class="hover-bg flex flex-row items-center"
	href="/projects/{projectIdContext.projectId}/groups/{group.id}"
>
	<Fa icon={faPenToSquare} fw />
</a>
