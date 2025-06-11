<script lang="ts">
	import { UseEffectExternalModule } from '$lib/commands/externalModule/UseEffectExternalModule';
	import { createId } from '$lib/data/createId';
	import { getGraphContext } from '$lib/data/graphContext';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { nodeItemWidth } from '$lib/node/nodeItemWidth';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import { Vector } from 'nodes-editor';
	import Fa from 'svelte-fa';
	import { getInternalModuleIdContext } from '../internalModule/internalModuleIdContext';
	import type { ExternalModuleData } from './ExternalModuleData';

	interface Props {
		externalModuleData: ExternalModuleData;
	}

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const { externalModuleData }: Props = $props();
	const projectDataContext = getProjectDataContext();
	const internalModuleIdContext = getInternalModuleIdContext();

	const isUsed = $derived(
		projectDataContext.projectData.graph.externalModuleReferences.some(
			(externalModuleReference) => {
				return externalModuleReference.id === externalModuleData.id;
			},
		),
	);

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
				externalModule: externalModuleData,
				internalModuleId: internalModuleIdContext.internalModuleId,
			},
		});

		editorContext.editor.execute(useEffectExternalModule);
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa fw icon={faDownload} color={isUsed ? 'oklch(62.3% 0.214 259.815)' : undefined} />
	{#if isUsed}
		Used
	{:else}
		Use
	{/if}
</button>
