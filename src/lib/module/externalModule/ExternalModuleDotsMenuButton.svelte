<script lang="ts">
	import type { ExternalModule } from '$lib/data/ExternalModule';
	import DotsMenuButton from '$lib/ui/DotsMenuButton.svelte';
	import DeleteExternalModuleButton from './DeleteExternalModuleButton.svelte';

	interface Props {
		externalModule: ExternalModule;
		redirectsTo?: 'mainExternalModuleGraph';
	}

	const { externalModule, redirectsTo }: Props = $props();
</script>

<DotsMenuButton>
	<DeleteExternalModuleButton {externalModule} {redirectsTo} />
</DotsMenuButton>
