<script lang="ts">
	import DotsMenuButton from '$lib/ui/DotsMenuButton.svelte';
	import DeleteInternalModuleButton from './DeleteInternalModuleButton.svelte';
	import type { InternalModule } from './InternalModule';
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
