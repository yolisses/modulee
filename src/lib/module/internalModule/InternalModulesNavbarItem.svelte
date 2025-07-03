<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import type { InternalModule } from './InternalModule';
	import InternalModuleDotsMenuButton from './InternalModuleDotsMenuButton.svelte';
	import { internalModuleIdContextKey } from './internalModuleIdContext';

	interface Props {
		internalModule: InternalModule;
	}

	const { internalModule }: Props = $props();
	const projectDataContext = getRequiredContext(projectDataContextKey);
	const projectId = $derived(projectDataContext.projectData.id);
	const internalModuleIdContext = getRequiredContext(internalModuleIdContextKey);
</script>

<div
	class="horizontal-tab group flex max-w-[10rem] flex-row p-0"
	data-tab-selected={internalModuleIdContext.internalModuleId === internalModule.id}
>
	<a
		title={internalModule.name}
		class="block overflow-hidden p-2 text-ellipsis whitespace-nowrap"
		href="/projects/{projectId}/internalModules/{internalModule.id}/graph"
	>
		{internalModule.name}
	</a>
	{#if internalModuleIdContext.internalModuleId === internalModule.id}
		<InternalModuleDotsMenuButton {internalModule} redirectsTo="mainInternalModuleGraph" />
	{/if}
</div>
