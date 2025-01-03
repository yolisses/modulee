<script lang="ts">
	import type { NodeType } from './NodeType';

	interface Props {
		nodeType: NodeType;
	}

	const { nodeType }: Props = $props();
</script>

<button class="common-button">
	{nodeType.name}
</button>
