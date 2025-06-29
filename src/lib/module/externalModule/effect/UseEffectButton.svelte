<script lang="ts">
	import { goto } from '$app/navigation';
	import { UseEffectCommand } from '$lib/commands/externalModule/UseEffectCommand';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import { getGraphContext } from '$lib/graph/graphContext';
	import { getProjectDataContext } from '$lib/project/ui/projectDataContextext';
	import { getBaseRouteContext } from '$lib/ui/baseRouteContext';
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getExternalModulesDataContext } from '../externalModulesDataContext';
	import type { EffectData } from './EffectData';
	import { getIsAudioInputNodeData } from './getIsAudioInputNodeData';
	import { pushIfMissingById } from './pushIfMissingById';

	interface Props {
		effectData: EffectData;
	}

	const graphContext = getGraphContext();
	const { effectData }: Props = $props();
	const editorContext = getEditorContext();
	const baseRouteContext = getBaseRouteContext();
	const projectDataContext = getProjectDataContext();
	const externalModulesDataContext = getExternalModulesDataContext();

	function handleClick() {
		const outputNode = graphContext.graph.nodes.values().find((node) => node.type === 'OutputNode');
		if (!outputNode) {
			throw new Error('Missing output node to connect');
		}

		const audioInputConnectionIds: Record<string, string> = {};
		effectData.graph.nodes.filter(getIsAudioInputNodeData).forEach((audioInputNodeData) => {
			audioInputConnectionIds[audioInputNodeData.id] = createId();
		});

		const command = new UseEffectCommand({
			id: createId(),
			type: 'UseEffectCommand',
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
			details: {
				audioInputConnectionIds,
				connectionId: createId(),
				moduleNodeId: createId(),
				externalModule: effectData,
				outputNodeId: outputNode.id,
			},
		});

		editorContext.editor.execute(command);

		pushIfMissingById(externalModulesDataContext.externalModulesData, effectData);

		goto(baseRouteContext.baseRoute + '/rack');
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa fw icon={faDownload} />
	Use
</button>
