<script lang="ts">
	import { getNodeDefinitionName } from '../definitions/getNodeDefinitionName';
	import type { NodeDefinition } from '../definitions/NodeDefinition';
	import { nodeDefinitionsByName } from '../definitions/nodeDefinitionsByName';
	import { AddNodeHandler } from './AddNodeHandler';

	const addNodeHandler = new AddNodeHandler();

	function getNodeDefinition(addNodeHandler: AddNodeHandler) {
		const inputDefinition =
			addNodeHandler.addNodeMenuParamsContext.addNodeMenuParams?.input?.getInputDefinition();
		if (!inputDefinition?.autoConnection) return;

		const nodeDefinition: NodeDefinition =
			nodeDefinitionsByName[inputDefinition.autoConnection.nodeType];

		return nodeDefinition;
	}

	const nodeDefinition = $derived(getNodeDefinition(addNodeHandler));

	function handleClick() {
		if (!nodeDefinition) return;
		addNodeHandler.handleNodeDefinitionSelect(nodeDefinition);
	}
</script>

{#if nodeDefinition}
	<button class="common-button justify-between" onclick={handleClick}>
		<div>
			{getNodeDefinitionName(nodeDefinition)}
		</div>
		<div class="opacity-50">from auto</div>
	</button>
{/if}
