<script lang="ts">
	import type { InternalModule } from '$lib/data/InternalModule.svelte';
	import DotsMenuButton from '$lib/project/DotsMenuButton.svelte';
	import DeleteInternalModuleButton from './DeleteInternalModuleButton.svelte';
	import RenameInternalModuleButton from './RenameInternalModuleButton.svelte';

	interface Props {
		internalModule: InternalModule;
		redirectsTo?: 'mainInternalModuleGraph';
	}

	const { internalModule, redirectsTo }: Props = $props();
</script>

<DotsMenuButton>
	<RenameInternalModuleButton {internalModule} />
	<DeleteInternalModuleButton {internalModule} {redirectsTo} />
</DotsMenuButton>
