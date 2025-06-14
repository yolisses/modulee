<script lang="ts">
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faFileAlt, faProjectDiagram, faSlidersH } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getProjectNavbarSelectionContext } from './projectNavbarSelectionContext';

	const projectDataContext = getProjectDataContext();
	const internalModuleIdContext = getInternalModuleIdContext();
	const projectNavbarSelectionContext = getProjectNavbarSelectionContext();
	const baseUrl = $derived('/projects/' + projectDataContext.projectData.id);
</script>

<div class="flex flex-row border-r-2 border-black/50 md:order-1 md:flex-col">
	<a
		class="vertical-tab"
		href="{baseUrl}/rack"
		class:tab-selected={projectNavbarSelectionContext.projectNavbarSelection === 'rack'}
	>
		<Fa fw icon={faSlidersH} />
		<div class="hidden md:flex">Rack</div>
	</a>
	<a
		class="vertical-tab"
		href="{baseUrl}/internalModules/{internalModuleIdContext.internalModuleId}/graph"
		class:tab-selected={projectNavbarSelectionContext.projectNavbarSelection === 'graph'}
	>
		<Fa fw icon={faProjectDiagram} flip="horizontal" />
		<div class="hidden md:flex">Graph</div>
	</a>
	<a
		href={baseUrl}
		class="vertical-tab"
		class:tab-selected={projectNavbarSelectionContext.projectNavbarSelection === 'project'}
	>
		<Fa fw icon={faFileAlt} />
		<div class="hidden md:flex">Project</div>
	</a>
	<div class="flex-1"></div>
	<a class="vertical-tab" href="/projects" aria-label="Home" title="Go to projects page">
		<img
			height="16"
			class="my-1"
			alt="Modulee logo"
			style="height: 1rem;"
			src="/logo with name.svg"
		/>
	</a>
</div>
