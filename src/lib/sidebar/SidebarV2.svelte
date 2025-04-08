<script lang="ts">
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faFileAlt, faProjectDiagram, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const projectDataContext = getProjectDataContext();
	const baseUrl = $derived('/projects/' + projectDataContext.projectData.id);
	const internalModuleIdContext = getInternalModuleIdContext();
</script>

<div class="flex flex-col border-r-2 border-black/50">
	<a
		class="common-button"
		href="{baseUrl}/internalModules/{internalModuleIdContext.internalModuleId}"
	>
		<Fa icon={faProjectDiagram} flip="horizontal" />
		Nodes
	</a>
	<a class="common-button" href="{baseUrl}/modules">
		<Fa icon={faPuzzlePiece} />
		Modules
	</a>
	<a class="common-button" href={baseUrl}>
		<Fa icon={faFileAlt} />
		Project
	</a>
	<div class="flex-1"></div>
	<a class="common-button" href="/" aria-label="Home">
		<img
			height="16"
			class="my-1"
			alt="Modulee logo"
			style="height: 1rem;"
			src="/logo with name.svg"
		/>
	</a>
</div>
