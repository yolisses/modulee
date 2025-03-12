<script lang="ts">
	import type { Module } from '$lib/data/Module';
	import type { ModuleNode } from '$lib/data/ModuleNode.svelte';
	import SetTargetInternalModuleButton from '$lib/internalModule/SetModuleReferenceButton.svelte';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		module: Module;
		moduleNode: ModuleNode;
	}

	const { moduleNode, module }: Props = $props();
	const projectDataContext = getProjectDataContext();
	const href = $derived(
		`/projects/${projectDataContext.projectData.id}/internalModules/${module.id}`,
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
		class="grow overflow-hidden text-ellipsis text-nowrap text-blue-300"
	>
		{module.name}
	</a>
	<SetTargetInternalModuleButton moduleNodeId={moduleNode.id}>
		<Fa icon={faEdit} title="Edit internalModule" style="padding-inline: 0.25lh;" />
	</SetTargetInternalModuleButton>
</div>
