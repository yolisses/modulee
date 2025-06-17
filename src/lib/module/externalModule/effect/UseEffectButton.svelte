<script lang="ts">
	import { UseEffectExternalModule } from '$lib/commands/externalModule/UseEffectExternalModule';
	import { createId } from '$lib/data/createId';
	import { getGraphContext } from '$lib/data/graphContext';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import { NODE_ITEM_WIDTH } from '$lib/node/NODE_ITEM_WIDTH';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import { Vector } from 'nodes-editor';
	import Fa from 'svelte-fa';
	import { getExternalModulesDataContext } from '../externalModulesDataContext';
	import type { EffectData } from './EffectData';

	interface Props {
		effectData: EffectData;
	}

	const graphContext = getGraphContext();
	const { effectData }: Props = $props();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();
	const internalModuleIdContext = getInternalModuleIdContext();
	const externalModulesDataContext = getExternalModulesDataContext();

	function handleClick() {
		const outputNode = graphContext.graph.nodes.values().find((node) => node.type === 'OutputNode');
		if (!outputNode) {
			throw new Error('Missing output node to connect');
		}

		const moduleNodePosition = outputNode.position
			.subtract(new Vector(NODE_ITEM_WIDTH, 0))
			.getData();

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

		externalModulesDataContext.externalModulesData.push(effectData);
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa fw icon={faDownload} />
	Use
</button>
