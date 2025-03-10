<script lang="ts">
	import { page } from '$app/state';
	import { getInternalModuleIdContext } from '$lib/internalModule/internalModuleIdContext';
	import { getSelectedTabContext } from '$lib/sidebar/selectedTabContext';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const internalModuleIdContext = getInternalModuleIdContext();

	$effect(() => {
		internalModuleIdContext.internalModuleId = data.internalModuleId;
	});

	const selectedTabContext = getSelectedTabContext();
	$effect(() => {
		page.params; // Force the effect to run on change [...internalModuleId]
		selectedTabContext.selectedTab = 'internalModule';
	});
</script>
