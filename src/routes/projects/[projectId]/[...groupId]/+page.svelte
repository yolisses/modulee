<script lang="ts">
	import { getGroupIdContext } from '$lib/group/groupIdContext';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const groupIdContext = getGroupIdContext();

	$effect(() => {
		groupIdContext.groupId = data.groupId;
	});
</script>
