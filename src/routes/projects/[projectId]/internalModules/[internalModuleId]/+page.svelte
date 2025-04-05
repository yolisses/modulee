<script lang="ts">
	import { page } from '$app/state';
	import { setInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import InternalModulePage from '$lib/project/InternalModulePage.svelte';
	import { getSelectedTabContext } from '$lib/sidebar/selectedTabContext';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();

	const internalModuleContext = $state({
		internalModuleId: data.internalModuleId,
	});
	setInternalModuleIdContext(internalModuleContext);

	const selectedTabContext = getSelectedTabContext();
	$effect(() => {
		page.params; // Force the effect to run on change [...internalModuleId]
		selectedTabContext.selectedTab = 'internalModule';
	});
</script>

<InternalModulePage />
