<script lang="ts">
	import type { Module } from '$lib/module/Module';
	import { getProjectDataContext } from '$lib/project/ui/projectDataContext';

	interface Props {
		module: Module;
	}

	const { module }: Props = $props();
	const projectDataContext = getProjectDataContext();
	const href = $derived(
		module.getReference().type === 'internal'
			? `/projects/${projectDataContext.projectData.id}/internalModules/${module.id}/graph`
			: `/projects/${projectDataContext.projectData.id}/externalModules/${module.id}`,
	);

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();
	}
</script>

<a
	{href}
	draggable="false"
	title={module.name}
	style:padding-inline="0.25lh"
	onpointerdown={handlePointerDown}
	class="grow overflow-hidden text-nowrap text-ellipsis text-blue-300"
>
	{module.name}
</a>
