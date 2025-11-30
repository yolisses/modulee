<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
	import { faFileAlt, faProjectDiagram, faSlidersH } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { projectNavbarSelectionContextKey } from '../projectNavbarSelectionContext';
	import { projectDataContextKey } from './projectDataContext';

	const projectDataContext = getRequiredContext(projectDataContextKey);
	const projectNavbarSelectionContext = getRequiredContext(projectNavbarSelectionContextKey);
	const baseUrl = $derived('/projects/' + projectDataContext.projectData.id);
	const internalModuleIdContext = getRequiredContext(internalModuleIdContextKey);
</script>

<a
	class="horizontal-tab flex flex-row"
	data-tab-selected={projectNavbarSelectionContext.projectNavbarSelection === 'graph'}
	href="{baseUrl}/internalModules/{internalModuleIdContext.internalModuleId}/graph"
>
	<Fa fw icon={faProjectDiagram} flip="horizontal" />
	Graph
</a>
<a
	class="horizontal-tab flex flex-row"
	data-tab-selected={projectNavbarSelectionContext.projectNavbarSelection === 'rack'}
	href="{baseUrl}/rack"
>
	<Fa fw icon={faSlidersH} />
	Rack
</a>
<a
	class="horizontal-tab flex flex-row"
	data-tab-selected={projectNavbarSelectionContext.projectNavbarSelection === 'project'}
	href={baseUrl}
>
	<Fa fw icon={faFileAlt} />
	Project
</a>
