<script lang="ts">
	import { initializeAudioFeatures } from '$lib/audio/initializeAudioFeatures.svelte';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { setGraphRegistryContext } from '$lib/graph/graphRegistryContext';
	import { homeNavbarSelectionContextKey } from '$lib/home/homeNavbarSelectionContext';
	import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
	import ExternalModulesPage from '$lib/module/externalModule/ExternalModulesPage.svelte';
	import PianoDisplay from '$lib/piano/PianoDisplay.svelte';
	import { createEmptyGraphData } from '$lib/project/create/createEmptyGraphData';
	import CreateInstrumentButton from '$lib/project/create/CreateInstrumentButton.svelte';
	import { getGraphRegistry } from '$lib/project/getGraphRegistry';
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	getRequiredContext(homeNavbarSelectionContextKey).homeNavbarSelection = 'instruments';

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
		<CreateInstrumentButton />
	{/snippet}
	{#snippet initialChildren()}
		<p class="p-2 text-sm">
			<Fa icon={faInfoCircle} class="inline-block opacity-50" fw />
			Hover over an option to use the instrument as preview.
		</p>
		<hr class="opacity-10" />
	{/snippet}
</ExternalModulesPage>

<PianoDisplay />
