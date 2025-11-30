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
	class="navbar-item"
	href="{baseUrl}/internalModules/{internalModuleIdContext.internalModuleId}/graph"
	data-tab-selected={projectNavbarSelectionContext.projectNavbarSelection === 'graph'}
>
	<Fa fw icon={faProjectDiagram} flip="horizontal" />
	<div class="navbar-item-text">Graph</div>
</a>
<a
	class="navbar-item"
	href="{baseUrl}/rack"
	data-tab-selected={projectNavbarSelectionContext.projectNavbarSelection === 'rack'}
>
	<Fa fw icon={faSlidersH} />
	<div class="navbar-item-text">Rack</div>
</a>
<a
	href={baseUrl}
	class="navbar-item"
	data-tab-selected={projectNavbarSelectionContext.projectNavbarSelection === 'project'}
>
	<Fa fw icon={faFileAlt} />
	<div class="navbar-item-text">Project</div>
</a>
