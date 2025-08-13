<script lang="ts">
	import { initializeAudioFeatures } from '$lib/audio/initializeAudioFeatures.svelte';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { setGraphRegistryContext } from '$lib/graph/graphRegistryContext';
	import { homeNavbarSelectionContextKey } from '$lib/home/homeNavbarSelectionContext';
	import ExternalModulesPage from '$lib/module/externalModule/ExternalModulesPage.svelte';
	import { setActivePitchesContext } from '$lib/piano/activePitchesContext';
	import PianoDisplay from '$lib/piano/PianoDisplay.svelte';
	import { createEmptyGraphData } from '$lib/project/create/createEmptyGraphData';
	import { getGraphRegistry } from '$lib/project/getGraphRegistry';
	import { SvelteSet } from 'svelte/reactivity';

	getRequiredContext(homeNavbarSelectionContextKey).homeNavbarSelection = 'instruments';

	setActivePitchesContext({ activePitches: new SvelteSet() });
	setGraphRegistryContext({ graphRegistry: getGraphRegistry(createEmptyGraphData(), []) });
	initializeAudioFeatures();
</script>

<ExternalModulesPage title="Instruments" moduleType="instrument" showCloseButton={false} />

<PianoDisplay />
