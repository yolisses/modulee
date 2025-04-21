<script lang="ts">
	import { page } from '$app/state';
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faFileAlt, faProjectDiagram, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const route = $derived(page.route.id || '');
	const projectDataContext = getProjectDataContext();
	const baseUrl = $derived('/projects/' + projectDataContext.projectData.id);
	const internalModuleIdContext = getInternalModuleIdContext();
</script>

<div class="flex flex-col border-r-2 border-black/50">
	<a
		class="common-button rounded-none border-white/25"
		href="{baseUrl}/internalModules/{internalModuleIdContext.internalModuleId}/graph"
		class:border-l-4={route.startsWith(
			'/projects/[projectId]/internalModules/[internalModuleId]/graph',
		)}
	>
		<Fa icon={faProjectDiagram} flip="horizontal" />
		Graph
	</a>
	<a
		href="{baseUrl}/internalModules"
		class="common-button rounded-none border-white/25"
		class:border-l-4={route === '/projects/[projectId]/internalModules'}
	>
		<Fa icon={faPuzzlePiece} />
		Internal modules
	</a>
	<a
		href="{baseUrl}/externalModules"
		class="common-button rounded-none border-white/25"
		class:border-l-4={route === '/projects/[projectId]/externalModules'}
	>
		<Fa icon={faPuzzlePiece} />
		External modules
	</a>
	<a
		href={baseUrl}
		class="common-button rounded-none border-white/25"
		class:border-l-4={route === '/projects/[projectId]'}
	>
		<Fa icon={faFileAlt} />
		Project
	</a>
	<div class="flex-1"></div>
	<a class="common-button rounded-none border-white/25" href="/" aria-label="Home">
		<img
			height="16"
			class="my-1"
			alt="Modulee logo"
			style="height: 1rem;"
			src="/logo with name.svg"
		/>
	</a>
</div>
