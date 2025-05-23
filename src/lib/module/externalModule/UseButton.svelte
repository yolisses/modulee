<script lang="ts">
	import { getGraphContext } from '$lib/data/graphContext';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getInternalModuleIdContext } from '../internalModule/internalModuleIdContext';
	import type { ExternalModuleData } from './ExternalModuleData';
	import { addEffectExternalModule } from './addEffectExternalModule';

	interface Props {
		externalModuleData: ExternalModuleData;
	}

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const { externalModuleData }: Props = $props();
	const projectDataContext = getProjectDataContext();
	const internalModuleIdContext = getInternalModuleIdContext();

	// TODO improve this function after usability tests
	function handleClick() {
		addEffectExternalModule(
			graphContext.graph,
			editorContext.editor,
			projectDataContext.projectData.id,
			internalModuleIdContext.internalModuleId,
			externalModuleData,
		);
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa fw icon={faDownload} />
	Use
</button>
