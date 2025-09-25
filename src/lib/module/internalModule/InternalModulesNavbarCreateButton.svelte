<script lang="ts">
	import { goto } from '$app/navigation';
	import { AddInternalModuleWithOutputNodeCommand } from '$lib/commands/internalModule/AddInternalModuleWithOutputNodeCommand';
	import { editorContextKey } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { graphContextKey } from '$lib/graph/graphContext';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import { baseRouteContextKey } from '$lib/ui/baseRouteContext';
	import { getNewItemName } from '$lib/ui/getNewItemName';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const baseRouteContext = getRequiredContext(baseRouteContextKey);
	const editorContext = getRequiredContext(editorContextKey);
	const graphContext = getRequiredContext(graphContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);

	function handleCreateClick() {
		const internalModuleId = createId();
		const internalModuleName = getNewItemName(
			graphContext.graph.internalModules.values(),
			'Internal module',
		);
		const command = new AddInternalModuleWithOutputNodeCommand({
			createdAt: new Date().toJSON(),
			id: createId(),
			projectId: projectDataContext.projectData.id,
			type: 'AddInternalModuleWithOutputNodeCommand',
			details: {
				internalModule: {
					id: internalModuleId,
					name: internalModuleName,
				},
				node: {
					extras: { channel: 0 },
					id: createId(),
					internalModuleId,
					isInputAutoConnectedMap: {},
					position: { x: 0, y: 0 },
					type: 'OutputNode',
					unconnectedInputValues: { input: 0 },
				},
			},
		});
		editorContext.editor.execute(command);

		goto(baseRouteContext.baseRoute + '/internalModules/' + internalModuleId + '/graph');
	}
</script>

<button class="common-button" onclick={handleCreateClick}>
	<Fa fw icon={faPlus} />
</button>
