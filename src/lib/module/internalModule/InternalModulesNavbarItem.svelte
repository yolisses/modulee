<script lang="ts">
	import type { InternalModule } from '$lib/module/InternalModule.svelte';
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import { getProjectDataContext } from '$lib/project/ui/projectDataContextext';
	import InternalModuleDotsMenuButton from './InternalModuleDotsMenuButton.svelte';

	interface Props {
		internalModule: InternalModule;
	}

	const { internalModule }: Props = $props();
	const projectDataContext = getProjectDataContext();
	const internalModuleIdContext = getInternalModuleIdContext();
	const projectId = $derived(projectDataContext.projectData.id);
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
