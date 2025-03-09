<script lang="ts">
	import { page } from '$app/state';
	import { getGroupIdContext } from '$lib/group/groupIdContext';
	import { getSelectedTabContext } from '$lib/sidebar/selectedTabContext';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const groupIdContext = getGroupIdContext();

	$effect(() => {
		groupIdContext.groupId = data.groupId;
	});

	const selectedTabContext = getSelectedTabContext();
	$effect(() => {
		page.params; // Force the effect to run on change [...groupId]
		selectedTabContext.selectedTab = 'group';
	});
</script>
