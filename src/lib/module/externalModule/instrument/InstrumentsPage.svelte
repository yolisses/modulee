<script lang="ts">
	import { initializeAudioFeatures } from '$lib/audio/initializeAudioFeatures.svelte';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { setGraphRegistryContext } from '$lib/graph/graphRegistryContext';
	import { homeNavbarSelectionContextKey } from '$lib/home/homeNavbarSelectionContext';
	import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
	import ExternalModulesPage from '$lib/module/externalModule/ExternalModulesPage.svelte';
	import { setActivePitchesContext } from '$lib/piano/activePitchesContext';
	import PianoDisplay from '$lib/piano/PianoDisplay.svelte';
	import { createEmptyGraphData } from '$lib/project/create/createEmptyGraphData';
	import { getGraphRegistry } from '$lib/project/getGraphRegistry';
	import { SvelteSet } from 'svelte/reactivity';

	getRequiredContext(homeNavbarSelectionContextKey).homeNavbarSelection = 'instruments';

	setActivePitchesContext({ activePitches: new SvelteSet() });
	const graphRegistryContext = $state({
		graphRegistry: getGraphRegistry(createEmptyGraphData(), []),
	});
	setGraphRegistryContext(graphRegistryContext);
	initializeAudioFeatures();

	function handleModuleHover(externalModuleData: ExternalModuleData) {
		const graphRegistry = getGraphRegistry(externalModuleData.graph, []);
		graphRegistryContext.graphRegistry = graphRegistry;
	}
</script>

<ExternalModulesPage
	{handleModuleHover}
	moduleType="instrument"
	showCloseButton={false}
	title="Instruments"
>
	{#snippet topChildren()}
		<p class="p-2 text-sm">Hover over an option to use the instrument as preview.</p>
		<hr class="opacity-10" />
	{/snippet}
</ExternalModulesPage>

<PianoDisplay />
