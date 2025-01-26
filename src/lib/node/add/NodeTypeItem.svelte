<script lang="ts">
	import { nodesName } from './nodeNames.js';
	import type { NodeType } from './NodeType.js';

	interface Props {
		nodeType: NodeType;
		onTypeClick: (nodeType: NodeType) => void;
	}

	const { nodeType, onTypeClick }: Props = $props();

	function handleClick() {
		onTypeClick(nodeType);
	}
</script>

<button onclick={handleClick} class="common-button">
	{nodesName[nodeType.name]}
</button>
