<script lang="ts">
	import { goto } from '$app/navigation';
	import { UseEffectCommand } from '$lib/commands/externalModule/UseEffectCommand';
	import { createId } from '$lib/global/createId';
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { EffectData } from './EffectData';
	import { getIsAudioInputNodeData } from './getIsAudioInputNodeData';
	import { pushIfMissingById } from './pushIfMissingById';

	interface Props {
		effectData: EffectData;
	}

	const graphContext = getRequiredContext(graphContextKey);
	const { effectData }: Props = $props();
	const editorContext = getRequiredContext(editorContextKey);
	const baseRouteContext = getRequiredContext(baseRouteContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);
	const externalModulesDataContext = getRequiredContext(externalModulesDataContextKey);

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
