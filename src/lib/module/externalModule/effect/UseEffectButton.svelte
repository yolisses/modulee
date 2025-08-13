<script lang="ts">
	import { goto } from '$app/navigation';
	import { UseEffectCommand } from '$lib/commands/externalModule/UseEffectCommand';
	import { editorContextKey } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { graphContextKey } from '$lib/graph/graphContext';
	import { graphRegistryContextKey } from '$lib/graph/graphRegistryContext';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import { baseRouteContextKey } from '$lib/ui/baseRouteContext';
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { EffectData } from './EffectData';
	import { getIsAudioInputNodeData } from './getIsAudioInputNodeData';

	interface Props {
		effectData: EffectData;
	}

	const { effectData }: Props = $props();
	const baseRouteContext = getRequiredContext(baseRouteContextKey);
	const editorContext = getRequiredContext(editorContextKey);
	const graphContext = getRequiredContext(graphContextKey);
	const graphRegistryContext = getRequiredContext(graphRegistryContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);

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

		graphRegistryContext.graphRegistry.externalModules.set(effectData);

		goto(baseRouteContext.baseRoute + '/rack');
	}
</script>

<button class="common-button center-content" onclick={handleClick}>
	<Fa fw icon={faDownload} />
	Use
</button>
