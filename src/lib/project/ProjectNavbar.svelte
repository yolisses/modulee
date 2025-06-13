<script lang="ts">
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import {
		faFileAlt,
		faProjectDiagram,
		faPuzzlePiece,
		faSlidersH,
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getProjectNavbarSelectionContext } from './projectNavbarSelectionContext';

	const projectDataContext = getProjectDataContext();
	const internalModuleIdContext = getInternalModuleIdContext();
	const projectNavbarSelectionContext = getProjectNavbarSelectionContext();
	const baseUrl = $derived('/projects/' + projectDataContext.projectData.id);
</script>

<div class="flex flex-col border-r-2 border-black/50">
	<a
		class="vertical-tab"
		href="{baseUrl}/rack"
		class:vertical-tab-selected={projectNavbarSelectionContext.projectNavbarSelection === 'rack'}
	>
		<Fa fw icon={faSlidersH} />
		Rack
	</a>
	<a
		class="vertical-tab"
		href="{baseUrl}/internalModules/{internalModuleIdContext.internalModuleId}/graph"
		class:vertical-tab-selected={projectNavbarSelectionContext.projectNavbarSelection === 'graph'}
	>
		<Fa fw icon={faProjectDiagram} flip="horizontal" />
		Graph
	</a>
	<a
		class="vertical-tab"
		href="{baseUrl}/externalModules"
		class:vertical-tab-selected={projectNavbarSelectionContext.projectNavbarSelection ===
			'externalModules'}
	>
		<Fa fw icon={faPuzzlePiece} />
		External modules
	</a>
	<a
		href={baseUrl}
		class="vertical-tab"
		class:vertical-tab-selected={projectNavbarSelectionContext.projectNavbarSelection === 'project'}
	>
		<Fa fw icon={faFileAlt} />
		Project
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
