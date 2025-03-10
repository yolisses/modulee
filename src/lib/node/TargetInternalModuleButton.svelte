<script lang="ts">
	import type { InternalModule } from '$lib/data/InternalModule.svelte';
	import type { InternalModuleNode } from '$lib/data/InternalModuleNode.svelte';
	import SetTargetInternalModuleButton from '$lib/internalModule/SetTargetInternalModuleButton.svelte';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		targetInternalModule: InternalModule;
		internalModuleNode: InternalModuleNode;
	}

	const { internalModuleNode, targetInternalModule }: Props = $props();
	const projectDataContext = getProjectDataContext();
	const href = $derived(
		`/projects/${projectDataContext.projectData.id}/internalModules/${targetInternalModule.id}`,
	);

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();
	}
</script>

<div class="hover-bg flex w-full flex-row">
	<a
		{href}
		draggable="false"
		style:padding-inline="0.25lh"
		onpointerdown={handlePointerDown}
		class="overflow-hidden text-ellipsis text-nowrap text-blue-300"
	>
		{targetInternalModule.name}
	</a>
	<SetTargetInternalModuleButton internalModuleNodeId={internalModuleNode.id}>
		<Fa icon={faEdit} title="Edit internalModule" />
	</SetTargetInternalModuleButton>
</div>
