<script lang="ts">
	import { page } from '$app/state';
	import { getInternalModuleIdContext$lib/group/internalModuleIdContextule/internalmoduleIdContext';
	import { getSelectedTabContext } from '$lib/sidebar/selectedTabContext';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const internalmoduleIdContext = getInternalModuleIdContext();

	$effect(() => {
		internalmoduleIdContext.internalmoduleId = data.internalmoduleId;
	});

	const selectedTabContext = getSelectedTabContext();
	$effect(() => {
		page.params; // Force the effect to run on change [...internalmoduleId]
		selectedTabContext.selectedTab = 'internalmodule';
	});
</script>
