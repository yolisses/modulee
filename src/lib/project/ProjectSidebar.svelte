<script lang="ts">
	import { page } from '$app/state';
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import {
		faFileAlt,
		faProjectDiagram,
		faPuzzlePiece,
		faSlidersH,
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const baseRoute = '/projects/[projectId]';
	const route = $derived(page.route.id || '');
	const projectDataContext = getProjectDataContext();
	const baseUrl = $derived('/projects/' + projectDataContext.projectData.id);
	const internalModuleIdContext = getInternalModuleIdContext();
</script>

<div class="flex flex-col border-r-2 border-black/50">
	<a
		class="vertical-tab"
		href="{baseUrl}/rack"
		class:vertical-tab-selected={route === baseRoute + '/rack'}
	>
		<Fa icon={faSlidersH} />
		Rack
	</a>
	<a
		class="vertical-tab"
		href="{baseUrl}/internalModules/{internalModuleIdContext.internalModuleId}/graph"
		class:vertical-tab-selected={route.startsWith(
			baseRoute + '/internalModules/[internalModuleId]/graph',
		)}
	>
		<Fa icon={faProjectDiagram} flip="horizontal" />
		Graph
	</a>
	<a
		class="vertical-tab"
		href="{baseUrl}/internalModules"
		class:vertical-tab-selected={route === baseRoute + '/internalModules'}
	>
		<Fa icon={faPuzzlePiece} />
		Internal modules
	</a>
	<a
		class="vertical-tab"
		href="{baseUrl}/externalModules"
		class:vertical-tab-selected={route === baseRoute + '/externalModules'}
	>
		<Fa icon={faPuzzlePiece} />
		External modules
	</a>
	<a href={baseUrl} class="vertical-tab" class:vertical-tab-selected={route === baseRoute}>
		<Fa icon={faFileAlt} />
		Project
	</a>
	<div class="flex-1"></div>
	<a class="vertical-tab" href="/" aria-label="Home">
		<img
			height="16"
			class="my-1"
			alt="Modulee logo"
			style="height: 1rem;"
			src="/logo with name.svg"
		/>
	</a>
</div>
