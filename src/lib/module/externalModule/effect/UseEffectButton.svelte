<script lang="ts">
	import { UseEffectExternalModule } from '$lib/commands/externalModule/UseEffectExternalModule';
	import { createId } from '$lib/data/createId';
	import { getGraphContext } from '$lib/data/graphContext';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import { nodeItemWidth } from '$lib/node/nodeItemWidth';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import { Vector } from 'nodes-editor';
	import Fa from 'svelte-fa';
	import type { EffectData } from './EffectData';

	interface Props {
		effectData: EffectData;
	}

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const { effectData }: Props = $props();
	const projectDataContext = getProjectDataContext();
	const internalModuleIdContext = getInternalModuleIdContext();

	function handleClick() {
		const outputNode = graphContext.graph.nodes.values().find((node) => node.type === 'OutputNode');
		if (!outputNode) {
			throw new Error('Missing output node to connect');
		}

		const moduleNodePosition = outputNode.position.subtract(new Vector(nodeItemWidth, 0)).getData();

		const useEffectExternalModule = new UseEffectExternalModule({
			id: createId(),
			createdAt: new Date().toJSON(),
			type: 'UseEffectExternalModule',
			projectId: projectDataContext.projectData.id,
			details: {
				moduleNodePosition,
				connectionId: createId(),
				moduleNodeId: createId(),
				outputNodeId: outputNode.id,
				externalModule: effectData,
				internalModuleId: internalModuleIdContext.internalModuleId,
			},
		});

		editorContext.editor.execute(useEffectExternalModule);
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa fw icon={faDownload} />
	Use
</button>
